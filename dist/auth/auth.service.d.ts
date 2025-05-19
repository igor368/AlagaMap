import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(email: string, password: string): Promise<User>;
    findByEmail(): Promise<void>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
