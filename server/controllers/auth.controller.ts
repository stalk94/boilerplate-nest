import { Controller, Post, Get, Body, HttpException, HttpStatus, Logger, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '../services/auth.service';
import * as bcrypt from 'bcrypt';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    
    }

    @Post('login')
    async login(@Body() body: { login: string; password: string }, @Res() res: Response) {
        const user = await this.authService.validateUser(body.login, body.password);
        
        if(!user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const token = await this.authService.generateJwtToken(user.login, user.role??'user');
        if(false) res.cookie('token', token, {
            httpOnly: true,             // Запрещает доступ к cookie через JavaScript
            //secure: process.env.NODE_ENV === 'production',  // Использовать только по HTTPS в продакшн
            sameSite: 'strict',         // Защита от CSRF атак
            //maxAge: 3600000,            // Время жизни токена в cookie (1 час)
        });


        res.send({ token })
    }
    
    @Post('reg')
    async registration(@Body() body: { login: string; password: string }) {
        const find = await this.authService.userService.getUserByLogin(body.login);

        if(!find) {
            const newUserData = {
                login: body.login,
                password: await bcrypt.hash(body.password, 10),
                role: 'user'
            }

            const result = await this.authService.userService.createUser(newUserData);
            const token = await this.authService.generateJwtToken(result.login, 'user');

            return { token }
        }
        else {
            throw new HttpException('LoginIsBusy', HttpStatus.NOT_ACCEPTABLE);
        }
    }
}