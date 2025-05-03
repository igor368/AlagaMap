import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { UsersService } from '../users/users.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repo: Repository<Report>,
    private usersService: UsersService,
  ) {}

  async create(userId: number, dto: CreateReportDto): Promise<Report> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new Error('User not found'); // ou use NotFoundException do Nest
    }
    const report = this.repo.create({ ...dto, user });
    return this.repo.save(report);
  }

  findAll(): Promise<Report[]> {
    return this.repo.find({ relations: ['user'] });
  }
}