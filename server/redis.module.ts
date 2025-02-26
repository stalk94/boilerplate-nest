import { Module, Global } from '@nestjs/common';
import { RedisService } from './services/redis.service';



@Global()
@Module({
    providers: [RedisService],
    exports: [RedisService], // Экспортируем сервис, чтобы использовать в других модулях
})
export class RedisModule {}