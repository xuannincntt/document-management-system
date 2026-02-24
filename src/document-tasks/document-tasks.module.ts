import { Module } from '@nestjs/common';
import { DocumentTasksService } from './document-tasks.service';
import { DocumentTasksController } from './document-tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentTask } from './document-tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentTask])],
  providers: [DocumentTasksService],
  controllers: [DocumentTasksController]
})
export class DocumentTasksModule {}
