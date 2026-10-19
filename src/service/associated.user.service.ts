
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssociatedUser } from '../entity/associate.user.entity.js';
import { AssociateUserDto } from '../dto/associate-users.dto.js';
import { UpdateAssociatedUserDto } from '../dto/update-associated-user.dto.js';

@Injectable()
export class AssociatedUserService {
    constructor(@InjectRepository(AssociatedUser) private associateduserRepo: Repository<AssociatedUser>) { }

    findAll() {
        return this.associateduserRepo.find({
            relations: { farmer: true, scheme: true },
        });
    }

async create(associateduserdto: AssociateUserDto) {
  const associateduser = this.associateduserRepo.create({
    farmer: { id: associateduserdto.farmer_id },
    scheme: { id: associateduserdto.scheme_id },

    enrollment_start_date: new Date(
      associateduserdto.enrollment_start_date,
    ),

    enrollment_end_date: associateduserdto.enrollment_end_date
      ? new Date(associateduserdto.enrollment_end_date)
      : null,
  });

  return this.associateduserRepo.save(associateduser);
}


    async update(id: string, dto: UpdateAssociatedUserDto) {
    const associatedUser = await this.associateduserRepo.findOne({
      where: { id },
    });

    if (!associatedUser) {
      throw new NotFoundException('Association not found');
    }

    if (dto.enrollment_start_date !== undefined) {
      associatedUser.enrollment_start_date =
        new Date(dto.enrollment_start_date);
    }

    if (dto.enrollment_end_date !== undefined) {
      associatedUser.enrollment_end_date = dto.enrollment_end_date === null
        ? null
        : new Date(dto.enrollment_end_date);
    }

    await this.associateduserRepo.save(associatedUser);

    return this.associateduserRepo.findOne({
      where: { id },
      relations: { farmer: true, scheme: true },
    });
  }
}