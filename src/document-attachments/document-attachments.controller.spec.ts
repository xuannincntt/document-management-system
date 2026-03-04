import { Test, TestingModule } from '@nestjs/testing';
import { DocumentAttachmentsController } from './document-attachments.controller';
import { DocumentAttachmentsService } from './document-attachments.service';

describe('DocumentAttachmentsController', () => {
  let controller: DocumentAttachmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentAttachmentsController],
      providers: [
        {
          provide: DocumentAttachmentsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DocumentAttachmentsController>(DocumentAttachmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
