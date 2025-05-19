import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
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
      throw new Error('User not found');
    }

    const report = this.repo.create({
      ...dto,
      user,
      active: true, // inicia como ativo
    });

    return this.repo.save(report);
  }

  // async findAll(): Promise<Report[]> {
  //   return this.repo.find({
  //     where: { active: true },
  //     relations: ['user'],
  //   });
  // }

  async findAll(): Promise<any[]> {
  const reports = await this.repo.find({ relations: ['user'] });

  return reports.map(report => ({
    id: report.id,
    latitude: report.latitude,
    longitude: report.longitude,
    comment: report.comment,
    street: report.street,
    active: report.active,
    createdAt: report.createdAt,
    user: {
      id: report.user.id, // apenas o ID
    },
  }));
}

}
