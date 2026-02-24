import { Module } from '@nestjs/common';
import { DocumentHistoriesService } from './document-histories.service';
import { DocumentHistoriesController } from './document-histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentHistory } from './document-histories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentHistory])],
  providers: [DocumentHistoriesService],
  controllers: [DocumentHistoriesController]
})
export class DocumentHistoriesModule {}
