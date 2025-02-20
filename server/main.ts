import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as rl from 'express-rate-limit';
dotenv.config();


async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.use(cookieParser());
	app.use(
		rl.rateLimit({
		  	windowMs: 60 * 1000, 	    // 1 минута
		  	max: 100, 					// Макс. 100 запросов за минуту
		}),
	);
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();