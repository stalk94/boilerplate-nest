import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { join } from 'path';


@Controller()
export class AppController {
    constructor() {
		
	}

    @Get()
    getIndex(@Res() res: Response): any {
        res.sendFile(join(__dirname, '../..', 'build', 'index.html'));
    }
}