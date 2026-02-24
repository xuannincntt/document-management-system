import { Module } from '@nestjs/common';
import { DocumentAttachmentsService } from './document-attachments.service';
import { DocumentAttachmentsController } from './document-attachments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentAttachment } from './document-attachments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentAttachment])],
  providers: [DocumentAttachmentsService],
  controllers: [DocumentAttachmentsController]
})
export class DocumentAttachmentsModule {}
