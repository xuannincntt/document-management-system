import { Test, TestingModule } from '@nestjs/testing';
import { DocumentStatusesController } from './document-statuses.controller';

describe('DocumentStatusesController', () => {
  let controller: DocumentStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentStatusesController],
    }).compile();

    controller = module.get<DocumentStatusesController>(DocumentStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
