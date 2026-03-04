import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './documents.service';
import { DataSource } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { InternalServerErrorException } from '@nestjs/common';
import { Document } from './documents.entity';
import { DocumentHistory } from '../document-histories/document-histories.entity';
import { DocumentAttachment } from '../document-attachments/document-attachments.entity';

describe('DocumentsService', () => {
  let service: DocumentsService;
  let dataSource: DataSource;
  let cloudinaryService: CloudinaryService;

  const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      create: jest.fn(),
      save: jest.fn(),
      insert: jest.fn(),
    },
  };

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
  };

  const mockCloudinaryService = {
    uploadFile: jest.fn(),
    deleteFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        { provide: DataSource, useValue: mockDataSource },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
    dataSource = module.get<DataSource>(DataSource);
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDraftDocument', () => {
    const createDto = { title: 'Test Doc', content: 'Test Content' };
    const userId = 1;
    const files = [{ originalname: 'test.png' }] as Express.Multer.File[];

    it('should create a draft document with attachments successfully', async () => {
      mockCloudinaryService.uploadFile.mockResolvedValue({
        public_id: 'pid',
        secure_url: 'url',
      });
      mockQueryRunner.manager.create.mockImplementation((entity, data) => data);
      mockQueryRunner.manager.save.mockImplementation(async (data) => ({ ...data, documentId: 100 }));

      const result = await service.createDraftDocument(createDto, userId, files);

      expect(result.message).toBe('Tạo văn bản nháp thành công!');
      expect(result.documentId).toBe(100);
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });

    it('should rollback transaction and delete uploaded files on error', async () => {
      mockCloudinaryService.uploadFile.mockResolvedValue({
        public_id: 'pid',
        secure_url: 'url',
      });
      mockQueryRunner.manager.save.mockRejectedValue(new Error('DB Error'));

      await expect(service.createDraftDocument(createDto, userId, files)).rejects.toThrow(InternalServerErrorException);

      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockCloudinaryService.deleteFile).toHaveBeenCalledWith('pid');
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });
  });
});
