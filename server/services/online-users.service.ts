import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UsersService } from './user.service';


@Injectable()
export class OnlineUsersService {
    public onlineUsers = new Map<string, Socket>()

    constructor(private userService: UsersService) {}

    // Добавление пользователя в онлайн
    addUser(login: string, socket: Socket) {
        this.onlineUsers.set(login, socket);
    }
    // Удаление пользователя из онлайн
    removeUser(login: string) {
        this.onlineUsers.delete(login);
        
        this.userService.update(login, {lastOnlineTimeshtmap: Date.now()});
    }
    // Получение списка онлайн-пользователей
    getOnlineUsers() {
        return Array.from(this.onlineUsers);
    }
    // Получение списка логинов онлайн
    getOnlineUsersLogins() {
        return this.onlineUsers.keys();
    }
}