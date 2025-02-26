import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { HttpException } from '@nestjs/common';



@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        let message = 'Internal server error';
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : 500;
        
        
        if(exception instanceof HttpException) {
            message = exception.message;
        } 
        else if(exception.name === 'ForbiddenError') {
            message = 'CSRF token is invalid or missing';
        } 
        else if(exception.name === 'SyntaxError') {
            message = 'Invalid JSON format';
        }

        
        // Формируем структуру ответа
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }
}