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

        const authHeader = request.headers.authorization;
        if(!authHeader) return false;
        
        const token = authHeader.split(' ')[1];     // Получаем токен из "Bearer <token>"
        if(!token) return false;                    // Токен отсутствует
        
        
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