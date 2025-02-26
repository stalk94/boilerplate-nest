import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Убедись, что у тебя есть этот сервис
import { User } from '@prisma/client';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    // Метод для создания нового пользователя
    async createUser(user: { login: string; password: string }): Promise<User> {
        return this.prisma.user.create({
            data: user,
        });
    }
    // Метод для получения всех пользователей
    async getUsersAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
    // Метод для получения пользователя по login
    async getUserByLogin(login: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { login },
        });
    }
    // Метод для обновления данных пользователя
    async update(login: string, updatedFields: Partial<User>) {
        const user = await this.getUserByLogin(login);

        if (user) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: updatedFields,
            });

            //! Используем глобальную шину событий
            process.emit('update:user', {
                login: login,
                updatedFields,
            });
        }
    }
}