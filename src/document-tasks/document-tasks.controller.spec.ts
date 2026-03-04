import { Test, TestingModule } from '@nestjs/testing';
import { DocumentTasksController } from './document-tasks.controller';
import { DocumentTasksService } from './document-tasks.service';

describe('DocumentTasksController', () => {
  let controller: DocumentTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentTasksController],
      providers: [
        {
          provide: DocumentTasksService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DocumentTasksController>(DocumentTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
