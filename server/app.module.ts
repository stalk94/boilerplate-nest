import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/user.service';
import { AppService } from './services/app.service';
import { OnlineUsersService } from './services/online-users.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UploadController } from './controllers/upload.controller';
import { OnlineUsersGateway } from './controllers/online-users.gateway';
import { JwtModule } from '@nestjs/jwt';
//import { User } from "./models/user";
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis.module';


const jwt = JwtModule.register({
	secret: 'test',
	signOptions: { expiresIn: '60d' },
});
const staticRoot = ServeStaticModule.forRoot({
	rootPath: join(__dirname, '..', 'build'),
	serveRoot: '/'
});

/**
 * const typeOrm = TypeOrmModule.forRoot({
	type: 'postgres',   
	host: 'localhost',       
	port: 5432,               
	username: 'postgres',     
	password: 'root', 		
	database: 'postgres',      
	entities: [User],        	
	synchronize: true,        // Включаем авто-синхронизацию таблиц
});
const ormEntitys = TypeOrmModule.forFeature([
	User
]);
 */


@Module({
	imports: [jwt, staticRoot, PrismaModule, RedisModule],
	controllers: [AppController, AuthController, UploadController],
	providers: [JwtAuthGuard, AuthService, UsersService, AppService, OnlineUsersGateway, OnlineUsersService],
})
export class AppModule {}