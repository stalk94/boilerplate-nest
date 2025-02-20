import { Controller, Get, Post, Res, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AppService } from '../services/app.service';
import { join } from 'path';
import { ErrorRequest } from '../types/base';
import * as fs from 'fs';



@Controller()
export class AppController {
    constructor(private service: AppService) {
		
	}

    @Get()
    getIndex(@Res() res: Response): any {
        res.sendFile(join(__dirname, '../..', 'build', 'index.html'));
    }

    @UseGuards(JwtAuthGuard)
    @Get('allModels')
    async getAllModels(@Req() req: Request, @Res() res: Response) {
        const users = await this.service.getAllusersModel();

        if(req.user?.role === 'user') res.send({
            users
        });
    }

    @Post('error')
    async setError(@Req() req: Request, @Res() res: Response) {
        const data:ErrorRequest = req.body;

        fs.appendFile("error.log", JSON.stringify(data, null, 2) + ",\n", {encoding:"utf-8"}, (err)=> {
            console.log('Получены сведения о ошибке от клиента');
        });

        res.send(true);
    }
}