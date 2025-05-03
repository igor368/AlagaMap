import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateReportDto } from './dto/create-report.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() dto: CreateReportDto) {
    return this.reportsService.create(req.user.userId, dto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}