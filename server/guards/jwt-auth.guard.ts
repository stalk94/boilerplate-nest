import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {

    }

    // 403 статус при не авторизованном
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const tokenCockie = request.cookies['token'];

        if(tokenCockie) request.headers.authorization = `Bearer ${tokenCockie}`;
        if(!request.headers.authorization) return false;
        
        const token = request.headers.authorization.split(' ')[1];     // Получаем токен из "Bearer <token>"
        
        if(!token) return false;                    // Токен отсутствует
        if(token === 'undefined') return false; 
        
        try {
            const decoded = this.jwtService.verify(token);  // Валидация токена
            request.user = decoded;                         // Сохраняем информацию о пользователе в запросе
            return true;
        } 
        catch(e) {
            return false;                                   // Если токен не валиден, доступ запрещён
        }
    }
}