
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farmer } from '../entity/user.entity.js';
import { AddUserDto } from '../dto/add-user.dto.js';
import { Schemes } from '../entity/scheme.entity.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';
import { ReplaceUserDto } from '../dto/replace.user.dto.js';
import { States } from '../entity/states.entity.js';

@Injectable()
export class FarmersService {
    constructor(
        @InjectRepository(Farmer) private userRepo: Repository<Farmer>,

        @InjectRepository(Schemes)
        private schemeRepo: Repository<Schemes>,

    ) { }


    async findAll(page = 1, limit = 100) {
        const [farmers, total] = await this.userRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: { state_name: true },
        });

        return { farmers, total, page, limit };
    }

    findOne(id: string) {
        return this.userRepo.findOne({
            where: { id },
            relations: { state_name: true },
        });
    }


    async create(dto: AddUserDto) {
        const farmer = this.userRepo.create({
            ...dto,
            state_name: dto.state_id ? { id: dto.state_id } : undefined,
        });

        const saved = await this.userRepo.save(farmer);

        return this.userRepo.findOne({
            where: { id: saved.id },
            relations: { state_name: true },
        });
    }

    async update(id: string, dto: Partial<AddUserDto>) {
        const farmer = await this.userRepo.findOne({
            where: { id },
        });

        if (!farmer) {
            throw new NotFoundException('Farmer not found.');
        }

        await this.userRepo.update(id, dto);

        return this.userRepo.findOne({
            where: { id },
            relations: { state_name: true },
        });
    }

    async delete(id: string) {
        const farmer = await this.userRepo.findOne({
            where: { id },
            relations: { schemes: true },
        });

        if (!farmer) {
            throw new NotFoundException('Farmer not found.');
        }

        if (farmer.schemes.length > 0) {
            throw new ConflictException(
                'Cannot delete farmer because they are associated with schemes.',
            );
        }

        await this.userRepo.delete(id);

        return { message: 'Farmer deleted successfully.' };
    }

    async updateUser(id: string, dto: ReplaceUserDto) {
        const farmer = await this.userRepo.findOne({
            where: { id },
        });

        if (!farmer) {
            throw new NotFoundException('Farmer not found.');
        }

        farmer.middle_name = dto.middle_name ?? null;
        farmer.address_2 = dto.address_2 ?? null;
        farmer.locality_name = dto.locality_name ?? null;
        farmer.gender = dto.gender ?? null;

        farmer.state_name = dto.state_id
            ? { id: dto.state_id } as States
            : null;

        await this.userRepo.save(farmer);

        return this.userRepo.findOne({
            where: { id },
            relations: { state_name: true },
        });
    }

    findFarmerSchemes(farmerId: string) {
        return this.userRepo.find({
            where: { id: farmerId },
            relations: { schemes: { scheme: true } },
        });
    }
}