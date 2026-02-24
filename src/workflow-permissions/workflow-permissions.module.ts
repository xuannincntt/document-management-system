import { Module } from '@nestjs/common';
import { WorkflowPermissionsService } from './workflow-permissions.service';
import { WorkflowPermissionsController } from './workflow-permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowPermission } from './workflow-permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowPermission])],
  providers: [WorkflowPermissionsService],
  controllers: [WorkflowPermissionsController]
})
export class WorkflowPermissionsModule {}
