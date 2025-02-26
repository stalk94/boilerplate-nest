import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';


@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client: Redis;

    constructor() {
        this.client = new Redis({
            host: '127.0.0.1',
            port: 6379
        });
        
        this.client.on('connect', ()=> console.log('✅ Connected to Redis'));
        this.client.on('error', (err)=> console.error('❌ Redis Error:', err));
    }
    async onModuleInit() {
        console.log('RedisService initialized');
        this.set('test', 'test', 10)
    }
    async onModuleDestroy() {
        await this.client.quit();
        console.log('RedisService destroyed');
    }

    // Метод для установки ключа
    async set(key: string, value: string, ttl?: number): Promise<string> {
        if (ttl) {
            return this.client.setex(key, ttl, value);
        }
        return this.client.set(key, value);
    }
    // Метод для получения значения
    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }
    // Метод для удаления ключа
    async del(key: string): Promise<number> {
        return this.client.del(key);
    }
}