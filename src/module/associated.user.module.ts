import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssociatedUser } from "../entity/associate.user.entity.js";
import { AssociatedUserService } from "../service/associated.user.service.js";
import { AssociatedUserController } from "../controller/associated.user.controller.js";

@Module({
    imports: [TypeOrmModule.forFeature([AssociatedUser])], 
    providers: [AssociatedUserService],
    controllers: [AssociatedUserController],
})

export class AssociatedUserModule{}