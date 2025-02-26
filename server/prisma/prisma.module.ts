import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
//import { UsersService } from '../services/user.service';

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule {}
