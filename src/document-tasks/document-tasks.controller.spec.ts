import { Test, TestingModule } from '@nestjs/testing';
import { DocumentTasksController } from './document-tasks.controller';

describe('DocumentTasksController', () => {
  let controller: DocumentTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentTasksController],
    }).compile();

    controller = module.get<DocumentTasksController>(DocumentTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
