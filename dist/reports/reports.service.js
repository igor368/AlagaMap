"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_entity_1 = require("./report.entity");
const users_service_1 = require("../users/users.service");
let ReportsService = class ReportsService {
    repo;
    usersService;
    constructor(repo, usersService) {
        this.repo = repo;
        this.usersService = usersService;
    }
    async create(userId, dto) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const report = this.repo.create({
            ...dto,
            user,
            active: true,
        });
        return this.repo.save(report);
    }
    async findAll() {
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
                id: report.user.id,
            },
        }));
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map