import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService, public userService: UsersService) {
		
	}

	// Генерация JWT токена
	async generateJwtToken(login: string) {
		const payload = { 
			login
		}

		return this.jwtService.sign(payload);
	}
	// Валидация пароля
	async validateUser(login: string, pass: string): Promise<any> {
		const user = await this.userService.getUserByLogin(login);

		if(user) {
			const hashedPassword = await bcrypt.hash(pass, 10);
			const isMatch = await bcrypt.compare(hashedPassword, user.password);


			if(isMatch) return user;
			else return null;
		}
		else return null;
	}
}
