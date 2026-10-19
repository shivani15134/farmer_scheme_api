import { Module } from "@nestjs/common";
import { SchemesController } from "../controller/scheme.controller.js";
import { SchemesService } from "../service/scheme.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Schemes } from "../entity/scheme.entity.js";
import { AssociatedUser } from "../entity/associate.user.entity.js";

@Module({
    imports: [TypeOrmModule.forFeature([Schemes, AssociatedUser])], ///Schemes- entity 
    providers: [SchemesService],
    controllers: [SchemesController],
})

export class SchemesModule{}