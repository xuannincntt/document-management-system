import { Test, TestingModule } from '@nestjs/testing';
import { DocumentAttachmentsService } from './document-attachments.service';

describe('DocumentAttachmentsService', () => {
  let service: DocumentAttachmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentAttachmentsService],
    }).compile();

    service = module.get<DocumentAttachmentsService>(DocumentAttachmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
