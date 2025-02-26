import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user';


// методы работы с моделью юзера
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {

    }

    // Метод для создания нового пользователя
    async createUser(user: {login: string, password: string}): Promise<User> {
        return this.usersRepository.save(user);
    }
    // Метод для получения всех пользователей
    async getUsersAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
    // Метод для получения пользователя по login
    async getUserByLogin(login: string): Promise<User|null> {
        return this.usersRepository.findOne({
            where: {
                login
            }
        });
    }
    async update(login: string, updatedFields: Partial<User>) {
        const user = await this.getUserByLogin(login);
        
        if(user) {
            this.usersRepository.update(user.id, updatedFields);
            //! используем глобальную шину (если будут еще подобные методы то надо создать отдельный emiter)
            process.emit('update:user', {
                login: login,
                updatedFields
            });
        }
    }
}