import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from './cloudinary.service';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

jest.mock('cloudinary');
jest.mock('streamifier');

describe('CloudinaryService', () => {
    let service: CloudinaryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CloudinaryService],
        }).compile();

        service = module.get<CloudinaryService>(CloudinaryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('uploadFile', () => {
        it('should upload a file and return the result', async () => {
            const mockResult = { public_id: 'pid', secure_url: 'url' };
            const mockPipe = jest.fn();

            (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation((options, callback) => {
                callback(null, mockResult);
                return { pipe: mockPipe };
            });

            (streamifier.createReadStream as jest.Mock).mockReturnValue({ pipe: mockPipe });

            const file = { buffer: Buffer.from('test') } as Express.Multer.File;
            const result = await service.uploadFile(file);

            expect(result).toEqual(mockResult);
            expect(cloudinary.uploader.upload_stream).toHaveBeenCalled();
            expect(streamifier.createReadStream).toHaveBeenCalled();
        });

        it('should reject if there is an upload error', async () => {
            (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation((options, callback) => {
                callback(new Error('Upload Error'), null);
                return { pipe: jest.fn() };
            });

            (streamifier.createReadStream as jest.Mock).mockReturnValue({ pipe: jest.fn() });

            const file = { buffer: Buffer.from('test') } as Express.Multer.File;
            await expect(service.uploadFile(file)).rejects.toThrow('Upload Error');
        });
    });

    describe('deleteFile', () => {
        it('should delete a file and return the result', async () => {
            const mockResult = { result: 'ok' };
            (cloudinary.uploader.destroy as jest.Mock).mockImplementation((publicId, callback) => {
                callback(null, mockResult);
            });

            const result = await service.deleteFile('pid');
            expect(result).toEqual(mockResult);
            expect(cloudinary.uploader.destroy).toHaveBeenCalledWith('pid', expect.any(Function));
        });

        it('should reject if there is a deletion error', async () => {
            (cloudinary.uploader.destroy as jest.Mock).mockImplementation((publicId, callback) => {
                callback(new Error('Delete Error'), null);
            });

            await expect(service.deleteFile('pid')).rejects.toThrow('Delete Error');
        });
    });
});
