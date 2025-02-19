import { Controller, Post, Get, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import * as bcrypt from 'bcrypt';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        
    }

    @Post('login')
    async login(@Body() body: { login: string; password: string }) {
        const user = await this.authService.validateUser(body.login, body.password);

        if(!user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const token = await this.authService.generateJwtToken(user.login);
        console.log('сгенерирован токен (log-in): ', token);

        return { token }
    }
    
    @Post('reg')
    async registration(@Body() body: { login: string; password: string }) {
        const find = await this.authService.userService.getUserByLogin(body.login);

        if(!find) {
            const newUserData = {
                login: body.login,
                password: await bcrypt.hash(body.password, 10)
            }

            const result = await this.authService.userService.createUser(newUserData);
            const token = await this.authService.generateJwtToken(result.login);

            return { token }
        }
        else {
            throw new HttpException('LoginIsBusy', HttpStatus.NOT_ACCEPTABLE);
        }
    }
}