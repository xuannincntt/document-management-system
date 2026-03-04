import { Test, TestingModule } from '@nestjs/testing';
import { DocumentStatusesController } from './document-statuses.controller';
import { DocumentStatusesService } from './document-statuses.service';

describe('DocumentStatusesController', () => {
  let controller: DocumentStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentStatusesController],
      providers: [
        {
          provide: DocumentStatusesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DocumentStatusesController>(DocumentStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
