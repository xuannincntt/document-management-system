import { Test, TestingModule } from '@nestjs/testing';
import { DocumentHistoriesService } from './document-histories.service';

describe('DocumentHistoriesService', () => {
  let service: DocumentHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentHistoriesService],
    }).compile();

    service = module.get<DocumentHistoriesService>(DocumentHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
