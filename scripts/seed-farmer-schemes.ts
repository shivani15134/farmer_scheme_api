import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

import { AppModule } from '../src/app.module.js';
import { Farmer } from '../src/entity/user.entity.js';
import { Schemes } from '../src/entity/scheme.entity.js';
import { AssociatedUser } from '../src/entity/associate.user.entity.js';

const TOTAL_ASSOCIATIONS = 8;
const BATCH_SIZE = 8;

async function seedFarmerSchemes() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const dataSource = app.get(DataSource);

    const farmerRepo = dataSource.getRepository(Farmer);
    const schemeRepo = dataSource.getRepository(Schemes);
    const associationRepo = dataSource.getRepository(AssociatedUser);

    // Fetch existing schemes. This should usually be a small table.
    const schemes = await schemeRepo.find({
      select: { id: true },
    });

    if (schemes.length === 0) {
      throw new Error(
        'No schemes found. Add schemes before seeding farmer_schemes.',
      );
    }

    const farmerCount = await farmerRepo.count();

    if (farmerCount === 0) {
      throw new Error(
        'No farmers found. Add farmers before seeding farmer_schemes.',
      );
    }

    if (TOTAL_ASSOCIATIONS > farmerCount) {
      throw new Error(
        `Requested ${TOTAL_ASSOCIATIONS} associations, but only ` +
          `${farmerCount} farmers exist. This script creates one ` +
          'association per farmer. Reduce TOTAL_ASSOCIATIONS or extend ' +
          'the script to allow multiple schemes per farmer.',
      );
    }

    let inserted = 0;
    let lastFarmerId: string | null = null;

    while (inserted < TOTAL_ASSOCIATIONS) {
      const currentBatchSize = Math.min(
        BATCH_SIZE,
        TOTAL_ASSOCIATIONS - inserted,
      );

      // Fetch only the next batch of existing farmer IDs.
      const query = farmerRepo
        .createQueryBuilder('farmer')
        .select('farmer.id', 'id')
        .orderBy('farmer.id', 'ASC')
        .limit(currentBatchSize);

      if (lastFarmerId !== null) {
        query.where('farmer.id > :lastFarmerId', {
          lastFarmerId,
        });
      }

      const farmers: { id: string }[] = await query.getRawMany();

      if (farmers.length === 0) {
        break;
      }

      const associations = farmers.map((farmer) => {
        const scheme = faker.helpers.arrayElement(schemes);

        const startDate = faker.date
          .between({
            from: '2015-01-01',
            to: '2026-10-20',
          })
          .toISOString()
          .slice(0, 10);

        // Some enrollments are still active, so end date can be null.
        const endDate =
          faker.helpers.maybe(
            () =>
              faker.date
                .between({
                  from: startDate,
                  to: '2026-10-20',
                })
                .toISOString()
                .slice(0, 10),
            { probability: 0.5 },
          ) ?? null;

        return {
          farmer: { id: farmer.id },
          scheme: { id: scheme.id },
          enrollment_start_date: startDate,
          enrollment_end_date: endDate,
        };
      });

      await associationRepo.insert(associations);

      inserted += farmers.length;
      lastFarmerId = farmers[farmers.length - 1].id;

      console.log(
        `Inserted ${inserted.toLocaleString()} / ` +
          `${TOTAL_ASSOCIATIONS.toLocaleString()} associations`,
      );
    }

    console.log('Farmer-scheme seeding completed successfully.');
  } finally {
    await app.close();
  }
}

seedFarmerSchemes().catch((error) => {
  console.error('Farmer-scheme seeding failed:', error);
  process.exitCode = 1;
});