import { Test, TestingModule } from '@nestjs/testing';
import { DocumentHistoriesController } from './document-histories.controller';
import { DocumentHistoriesService } from './document-histories.service';

describe('DocumentHistoriesController', () => {
  let controller: DocumentHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentHistoriesController],
      providers: [
        {
          provide: DocumentHistoriesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DocumentHistoriesController>(DocumentHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
