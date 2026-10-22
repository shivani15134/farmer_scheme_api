import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerModule } from './module/user.module.js';
import { FarmersController } from './controller/user.controller.js';
import { SchemesModule } from './module/scheme.module.js';
import { AssociatedUserModule } from './module/associated.user.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pulse',
      password: "pulse_dev_password",
      database: 'farmer_schemes',
      autoLoadEntities: true,
      synchronize: true,     
    }),
    FarmerModule,
    SchemesModule,
    AssociatedUserModule
  ],
})
export class AppModule {}
