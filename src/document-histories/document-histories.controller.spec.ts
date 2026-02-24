import { Test, TestingModule } from '@nestjs/testing';
import { DocumentHistoriesController } from './document-histories.controller';

describe('DocumentHistoriesController', () => {
  let controller: DocumentHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentHistoriesController],
    }).compile();

    controller = module.get<DocumentHistoriesController>(DocumentHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
