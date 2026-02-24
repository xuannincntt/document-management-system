import { Test, TestingModule } from '@nestjs/testing';
import { DocumentTasksService } from './document-tasks.service';

describe('DocumentTasksService', () => {
  let service: DocumentTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentTasksService],
    }).compile();

    service = module.get<DocumentTasksService>(DocumentTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
