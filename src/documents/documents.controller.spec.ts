import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('DocumentsController', () => {
  let controller: DocumentsController;
  let service: DocumentsService;

  const mockDocumentsService = {
    createDraftDocument: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        {
          provide: DocumentsService,
          useValue: mockDocumentsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<DocumentsController>(DocumentsController);
    service = module.get<DocumentsService>(DocumentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call documentsService.createDraftDocument', async () => {
      const dto = { title: 'Test', content: 'Content' };
      const files = [] as Express.Multer.File[];
      const req = { user: { userId: 1 } };

      mockDocumentsService.createDraftDocument.mockResolvedValue({ message: 'Success' });

      const result = await controller.create(files, dto, req);

      expect(result).toEqual({ message: 'Success' });
      expect(mockDocumentsService.createDraftDocument).toHaveBeenCalledWith(dto, 1, files);
    });
  });
});
