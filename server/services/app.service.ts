import { Injectable } from '@nestjs/common';
import { UsersService } from './user.service';


@Injectable()
export class AppService {
	constructor(private userService: UsersService) {
        
    }

    async getAllusersModel() {
        return await this.userService.getUsersAll();
    }
}
