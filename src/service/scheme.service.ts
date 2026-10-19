
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schemes } from '../entity/scheme.entity.js';
import { AddSchemeDto } from '../dto/add-scheme.dto.js';
import { AssociatedUser } from '../entity/associate.user.entity.js';
import { UpdateSchemeDto } from '../dto/update-scheme.dto.js';

@Injectable()
export class SchemesService {
  constructor(
    @InjectRepository(Schemes) private schemeRepo: Repository<Schemes>,

  ) { }                                                                                       ///Schemes- import from entity

  findAll() {
    return this.schemeRepo.find();
  }

  async findOne(id: string) {
    const scheme = await this.schemeRepo.findOneBy({ id });

    if (!scheme) {
      throw new NotFoundException('Scheme not found.');
    }

    return scheme;
  }

  async create(dto: AddSchemeDto) {
    const scheme = this.schemeRepo.create(dto);
    return this.schemeRepo.save(scheme);
  }

  async update(id: string, dto: UpdateSchemeDto) {
    const scheme = await this.schemeRepo.findOneBy({ id });

    if (!scheme) {
      throw new NotFoundException('Scheme not found.');
    }

    this.schemeRepo.merge(scheme, dto);

    await this.schemeRepo.save(scheme);

    return this.schemeRepo.findOneBy({ id });
  }

 async updateScheme(id: string, dto: AddSchemeDto) {
  const scheme = await this.schemeRepo.findOneBy({ id });

  if (!scheme) {
    throw new NotFoundException('Scheme not found.');
  }

  scheme.name = dto.name;
  scheme.description = dto.description;
  scheme.startDate = new Date(dto.startDate);
  scheme.endDate = new Date(dto.endDate);

  await this.schemeRepo.save(scheme);

  return this.schemeRepo.findOneBy({ id });
}

  async delete(id: string) {
    const scheme = await this.schemeRepo.findOneBy({ id });

    if (!scheme) {
      throw new NotFoundException('Scheme not found.');
    }

    await this.schemeRepo.delete(id);

    return { message: 'Scheme deleted successfully.' };
  }

  getFarmerCountPerScheme(asOnDate?: string) {
    const date = asOnDate ?? new Date().toISOString().slice(0, 10);

    return this.schemeRepo
      .createQueryBuilder('scheme')
      .leftJoin(AssociatedUser,
        'fs',
        `fs.scheme_id = scheme.id
        AND fs.enrollment_start_date <= :date
        AND (fs.enrollment_end_date >= :date OR fs.enrollment_end_date IS NULL)`,
        { date },
      )
      .select('scheme.id', 'schemeId')
      .addSelect('scheme.name', 'schemeName')
      .addSelect('COUNT(DISTINCT fs.farmer_id)', 'farmerCount')

      .groupBy('scheme.id')
      .addGroupBy('scheme.name')
      .getRawMany();
  }
}

