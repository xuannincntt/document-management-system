import { Test, TestingModule } from '@nestjs/testing';
import { DocumentAttachmentsController } from './document-attachments.controller';

describe('DocumentAttachmentsController', () => {
  let controller: DocumentAttachmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentAttachmentsController],
    }).compile();

    controller = module.get<DocumentAttachmentsController>(DocumentAttachmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
