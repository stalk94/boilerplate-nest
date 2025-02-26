import { ServerPayloads, ClientPayloads, SocketEvents } from "../types/base";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { OnlineUsersService } from '../services/online-users.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';


@WebSocketGateway({ cors: true })
export class OnlineUsersGateway {
    @WebSocketServer() server: Server;
    constructor(
        private onlineUsersService: OnlineUsersService,
        private readonly jwtService: JwtService
    ) { 
        process.on('update:user', this.handleUserUpdate.bind(this));
    }

    private handleUserUpdate(data: { login: string, updatedFields: Partial<User> }) {
        const room = data.login;
        const sockets = this.server.sockets.adapter.rooms.get(room);

        if(sockets) {
            // Отправляем обновление всем подписанным пользователям
            this.server.to(room).emit('user:update', data.updatedFields);
        }
    }
    // Метод для отправки обновленного списка онлайн-пользователей
    private updateOnlineUsers() {
        const onlineLogins = this.onlineUsersService.getOnlineUsersLogins();
        this.server.emit('onlineUsersUpdate', onlineLogins);
    }
    // Обработчик подключения пользователя
    handleConnection(@ConnectedSocket() client: Socket) {
        const token = client.handshake.auth?.token;

        try {
            const decoded = this.jwtService.verify(String(token));
            const login = decoded.login;
            client.data.login = login;
            client.join(login);         // именная комната юзера

            this.onlineUsersService.addUser(login, client);
            this.updateOnlineUsers();
        } 
        catch(error) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        console.log('socket connect: ', client.id);
    }
    // Обработчик отключения пользователя
    handleDisconnect(@ConnectedSocket() client: Socket) {
        const login = client.data.login;
        this.onlineUsersService.removeUser(login);
        this.updateOnlineUsers();

        console.log('socket disconnect: ', login);
    }
    
    // получить список онлайн (логинов)
    @SubscribeMessage('getOnlineUsers')
    handleGetOnlineUsers(@ConnectedSocket() client: Socket) {
        const onlineLogins = this.onlineUsersService.getOnlineUsersLogins();
        client.emit('onlineUsersUpdate', onlineLogins);
    }
    // подписка на юзер комнату
    @SubscribeMessage('user:subscribe')
    handleSubUserToUser(@ConnectedSocket() client: Socket, @MessageBody() data: ServerPayloads['user:subscribe']) {
        if(typeof data === 'string') {
            const result = this.onlineUsersService.onlineUsers.get(data);
            if(result) client.join(data);
        }
        else {
            data.map((login)=> {
                const result = this.onlineUsersService.onlineUsers.get(login);
                if(result) client.join(data);
            });
        }
    }
}