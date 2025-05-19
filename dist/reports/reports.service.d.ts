import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { UsersService } from '../users/users.service';
import { CreateReportDto } from './dto/create-report.dto';
export declare class ReportsService {
    private repo;
    private usersService;
    constructor(repo: Repository<Report>, usersService: UsersService);
    create(userId: number, dto: CreateReportDto): Promise<Report>;
    findAll(): Promise<any[]>;
}
