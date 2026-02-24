import { Test, TestingModule } from '@nestjs/testing';
import { DocumentStatusesService } from './document-statuses.service';

describe('DocumentStatusesService', () => {
  let service: DocumentStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentStatusesService],
    }).compile();

    service = module.get<DocumentStatusesService>(DocumentStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
