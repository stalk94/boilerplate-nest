import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as rl from 'express-rate-limit';
import * as compression from 'compression';
import * as csurf from 'csurf';
import { AllExceptionsFilter } from './middlewares/exception';
dotenv.config();


async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new AllExceptionsFilter());

	app.enableCors({
		origin: ['http://localhost:3001']					// только для DEV
	});
	app.use(compression());
	app.use(cookieParser());
	app.use(csurf({
		cookie: {
		  	httpOnly: true, 										// Устанавливаем cookie как доступную только для сервера
		  	secure: process.env.NODE_ENV === 'production',			// В продакшене использовать только через HTTPS
		  	sameSite: 'Strict', 									// Защищает от CSRF при работе с cookies
		}
	}));
	app.use(
		rl.rateLimit({
		  	windowMs: 60 * 1000, 	    // 1 минута
		  	max: 100, 					// Макс. 100 запросов за минуту
		}),
	);
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();