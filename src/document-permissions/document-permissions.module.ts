import { Module } from '@nestjs/common';
import { DocumentPermissionsService } from './document-permissions.service';
import { DocumentPermissionsController } from './document-permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentPermission } from './document-permissions.entity';
import { WorkflowActionsModule } from '../workflow-actions/workflow-actions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentPermission]),
    WorkflowActionsModule
  ],
  providers: [DocumentPermissionsService],
  controllers: [DocumentPermissionsController],
  exports: [DocumentPermissionsService]
})
export class DocumentPermissionsModule { }
