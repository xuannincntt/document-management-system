import { Module } from '@nestjs/common';
import { DocumentStatusesService } from './document-statuses.service';
import { DocumentStatusesController } from './document-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentStatus } from './document-statuses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentStatus])],
  providers: [DocumentStatusesService],
  controllers: [DocumentStatusesController]
})
export class DocumentStatusesModule {}
