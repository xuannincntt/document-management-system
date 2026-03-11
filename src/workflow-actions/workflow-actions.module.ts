import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowAction } from './workflow-action.entity';
import { WorkflowActionsService } from './workflow-actions.service';
import { WorkflowActionsController } from './workflow-actions.controller';

@Module({
    imports: [TypeOrmModule.forFeature([WorkflowAction])],
    providers: [WorkflowActionsService],
    controllers: [WorkflowActionsController],
    exports: [WorkflowActionsService],
})
export class WorkflowActionsModule { }
