import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/user.service';
import { AppService } from './services/app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { User } from "./models/user";
import { join } from 'path';


const jwt = JwtModule.register({
	secret: 'test',
	signOptions: { expiresIn: '60d' },
});
const staticRoot = ServeStaticModule.forRoot({
	rootPath: join(__dirname, '..', 'build'),
	serveRoot: '/'
});
const typeOrm = TypeOrmModule.forRoot({
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


@Module({
	imports: [jwt, staticRoot, typeOrm, ormEntitys],
	controllers: [AppController, AuthController],
	providers: [JwtAuthGuard, AuthService, UsersService, AppService],
})
export class AppModule {}