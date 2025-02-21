import { Test, TestingModule } from '@nestjs/testing';
import { OnlineUsersService } from '../server/services/online-users.service';
import { UsersService } from '../server/services/user.service';
import { Socket } from 'socket.io';


describe('OnlineUsersService', () => {
    let service: OnlineUsersService;
    let mockUsersService: Partial<UsersService>;

    beforeEach(async () => {
        mockUsersService = {
            update: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OnlineUsersService,
                { provide: UsersService, useValue: mockUsersService },
            ],
        }).compile();

        service = module.get<OnlineUsersService>(OnlineUsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should add user to onlineUsers map', () => {
        const socket = { id: 'socket1' } as Socket;
        service.addUser('user1', socket);
        expect(service.onlineUsers.get('user1')).toBe(socket);
    });

    it('should remove user from onlineUsers map and update lastOnlineTimestamp', () => {
        const socket = { id: 'socket1' } as Socket;
        service.addUser('user1', socket);
        service.removeUser('user1');

        expect(service.onlineUsers.has('user1')).toBe(false);
        expect(mockUsersService.update).toHaveBeenCalledWith('user1', {
            lastOnlineTimeshtmap: expect.any(Number),
        });
    });

    it('should return an array of online users', () => {
        const socket1 = { id: 'socket1' } as Socket;
        const socket2 = { id: 'socket2' } as Socket;
        service.addUser('user1', socket1);
        service.addUser('user2', socket2);

        expect(service.getOnlineUsers()).toEqual([
            ['user1', socket1],
            ['user2', socket2],
        ]);
    });

    it('should return an iterator of online user logins', () => {
        service.addUser('user1', {} as Socket);
        service.addUser('user2', {} as Socket);

        const logins = Array.from(service.getOnlineUsersLogins());
        expect(logins).toEqual(['user1', 'user2']);
    });
});
