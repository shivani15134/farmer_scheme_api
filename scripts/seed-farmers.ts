import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

import { AppModule } from '../src/app.module.js';
import { Farmer } from '../src/entity/user.entity.js';
import { States } from '../src/entity/states.entity.js';

const TOTAL_FARMERS = 20_000_000;
const BATCH_SIZE = 5_000;

const firstNames = [
  'Ramlal', 'Ramesh', 'Mukesh', 'Shyamlal', 'Gopal',
  'Mahendra', 'Babulal', 'Kailash', 'Omprakash', 'Ghanshyam',
  'Mohanlal', 'Hariram', 'Ramprasad', 'Jagannath', 'Bhagwan',
  'Kishan', 'Bhanwar', 'Dinesh', 'Sohanlal', 'Murlidhar',
  'Govind', 'Raghunath', 'Laxman', 'Narayan', 'Shivlal',
  'Jagdish', 'Premchand', 'Kanhaiyalal', 'Vishnu', 'Madhav',
  'Surajmal', 'Tejram', 'Hukumchand', 'Deendayal', 'Ratanlal',
  'Motilal', 'Ganesh', 'Shankar', 'Bhupendra', 'Rajendra',
  'Ashok', 'Anand', 'Prakash', 'Surendra', 'Virendra',
  'Ramvati', 'Kamla', 'Shanti', 'Savitri', 'Sushila',
  'Parvati', 'Gangadevi', 'Phoolwati', 'Santosh', 'Laxmi',
  'Chandrakala', 'Jamuna', 'Kamlabai', 'Geeta', 'Basanti',
  'Sarla', 'Indira', 'Rajeshwari', 'Leela',
  'Champa', 'Durgadevi', 'Tulsi', 'Bhagirathi', 'Kaushalya',
];

const middleNames = [
  'Kumar', 'Lal', 'Prasad', 'Singh', 'Ram',
  'Chandra', 'Das', 'Nath', 'Pratap', 'Dayal',
  'Narayan', 'Shankar', 'Devi', 'Bai', 'Kunwar',
  'Mohan', 'Kishor', 'Bahadur', 'Sahai', 'Din',
];

const lastNames = [
  'Sharma', 'Verma', 'Patel', 'Yadav', 'Gupta',
  'Meena', 'Chouhan', 'Chauhan', 'Rathore', 'Saini',
  'Jat', 'Prajapati', 'Kushwaha', 'Rajput', 'Bairwa',
  'Jatav', 'Sahu', 'Lodhi', 'Mali', 'Gurjar',
  'Pawar', 'Thakur', 'Mishra', 'Dubey', 'Tiwari',
  'Joshi', 'Solanki', 'Parmar', 'Sisodia', 'Tomar',
  'Kumawat', 'Bishnoi', 'Nayak', 'Reddy', 'Nair',
  'Kumar', 'Das', 'Mondal', 'Soren', 'Oraon',
  'Khan', 'Ansari', 'Qureshi', 'Shaikh', 'Mandal',
  'Jain', 'Bansal', 'Agarwal', 'Mahato', 'Sahu',
];

async function seedFarmers() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const dataSource = app.get(DataSource);

    const farmerRepo = dataSource.getRepository(Farmer);
    const stateRepo = dataSource.getRepository(States);

    const states = await stateRepo.find();

    if (states.length === 0) {
      throw new Error('No states found. Add states before seeding farmers.');
    }

    let inserted = 0;

    while (inserted < TOTAL_FARMERS) {
      const currentBatchSize = Math.min(
        BATCH_SIZE,
        TOTAL_FARMERS - inserted,
      );

      const farmers = Array.from(
        { length: currentBatchSize },
        () => {
          const state = faker.helpers.arrayElement(states);

          return {
            first_name: faker.helpers.arrayElement(firstNames),

            middle_name: faker.helpers.maybe(
              () => faker.helpers.arrayElement(middleNames),
              { probability: 0.3 },
            ) ?? null,

            last_name: faker.helpers.arrayElement(lastNames),

            date_of_birth: faker.date
              .birthdate({ min: 18, max: 80, mode: 'age' })
              .toISOString()
              .slice(0, 10),

            address_1: faker.location.streetAddress(),

            address_2: faker.helpers.maybe(
              () => faker.location.secondaryAddress(),
              { probability: 0.4 },
            ) ?? null,

            locality_name: faker.location.city(),

            gender: faker.helpers.arrayElement([
              'Male',
              'Female',
              'Other',
            ]),

            state_name: { id: state.id },
          };
        },
      );

      await farmerRepo.insert(farmers as any);

      inserted += currentBatchSize;

      console.log(`Inserted ${inserted}/${TOTAL_FARMERS} farmers`);
    }

    console.log('Farmer seeding completed successfully.');
  } finally {
    await app.close();
  }
}

seedFarmers().catch((error) => {
  console.error('Farmer seeding failed:', error);
  process.exitCode = 1;
});