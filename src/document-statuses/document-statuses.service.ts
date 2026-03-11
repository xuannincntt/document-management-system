import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentStatus } from './document-statuses.entity';
import { CreateDocumentStatusDto, UpdateDocumentStatusDto } from './dto/document-status.dto';

@Injectable()
export class DocumentStatusesService {
    constructor(
        @InjectRepository(DocumentStatus)
        private readonly statusRepository: Repository<DocumentStatus>,
    ) { }

    async findAll(): Promise<DocumentStatus[]> {
        return await this.statusRepository.find();
    }

    async findOne(id: number): Promise<DocumentStatus> {
        const status = await this.statusRepository.findOne({ where: { StatusId: id } });
        if (!status) throw new NotFoundException('Không tìm thấy trạng thái văn bản');
        return status;
    }

    async create(createDto: CreateDocumentStatusDto): Promise<DocumentStatus> {
        const existing = await this.statusRepository.findOne({ where: { StatusCode: createDto.StatusCode } });
        if (existing) throw new ConflictException('Mã trạng thái đã tồn tại');

        const status = this.statusRepository.create(createDto);
        return await this.statusRepository.save(status);
    }

    async update(id: number, updateDto: UpdateDocumentStatusDto): Promise<DocumentStatus> {
        const status = await this.findOne(id);

        if (updateDto.StatusCode && updateDto.StatusCode !== status.StatusCode) {
            const existing = await this.statusRepository.findOne({ where: { StatusCode: updateDto.StatusCode } });
            if (existing) throw new ConflictException('Mã trạng thái mới đã tồn tại');
        }

        Object.assign(status, updateDto);
        return await this.statusRepository.save(status);
    }

    async remove(id: number): Promise<{ message: string }> {
        const status = await this.findOne(id);
        await this.statusRepository.remove(status);
        return { message: 'Xóa trạng thái văn bản thành công' };
    }
}
