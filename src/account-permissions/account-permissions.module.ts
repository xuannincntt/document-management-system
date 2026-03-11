import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountPermission } from './account-permission.entity';
import { AccountPermissionsService } from './account-permissions.service';
import { AccountPermissionsController } from './account-permissions.controller';
import { User } from '../users/user.entity';
import { WorkflowAction } from '../workflow-actions/workflow-action.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AccountPermission, User, WorkflowAction])],
    providers: [AccountPermissionsService],
    controllers: [AccountPermissionsController],
    exports: [AccountPermissionsService],
})
export class AccountPermissionsModule { }
