import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService, public userService: UsersService) {
		
	}

	// Генерация JWT токена
	async generateJwtToken(login: string, role: 'user'|'admin') {
		const payload = { 
			login,
			role: role ?? 'user'
		}

		return this.jwtService.sign(payload);
	}
	// Валидация пароля
	async validateUser(login: string, pass: string): Promise<any> {
		const user = await this.userService.getUserByLogin(login);
		
		if(user) {
			const isMatch = await bcrypt.compare(pass, user.password);

			if(isMatch) return user;
			else return null;
		}
		else return null;
	}
}
