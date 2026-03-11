import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentPermission } from './document-permissions.entity';
import { Repository } from 'typeorm';
import { CreateDocumentPermissionDto } from './dto/create-document-permission.dto';

@Injectable()
export class DocumentPermissionsService {
    constructor(
        @InjectRepository(DocumentPermission)
        private permissionRepository: Repository<DocumentPermission>,
    ) { }
    async getAllPermissions() {
        return await this.permissionRepository.find({
            relations: ['role', 'status', 'action'],
        });
    }
    async createPermission(createDto: CreateDocumentPermissionDto) {
        const { roleId, statusId, actionId } = createDto;
        const existingPermission = await this.permissionRepository.findOne({
            where: {
                role: { RoleId: roleId },
                status: { StatusId: statusId },
                action: { actionId: actionId },
            },
        });
        if (existingPermission) {
            throw new ConflictException('Quyền này đã được thiết lập từ trước!');
        }
        const newPermission = this.permissionRepository.create({
            role: { RoleId: roleId },
            status: { StatusId: statusId },
            action: { actionId: actionId },
        });
        await this.permissionRepository.save(newPermission);
        return {
            message: 'Thêm mới quyền thành công!',
            data: newPermission,
        };
    }
    async deletePermission(id: number) {
        await this.permissionRepository.delete(id);
        return {
            message: 'Xóa quyền thành công!',
        };
    }
    async updatePermission(id: number, updateDto: CreateDocumentPermissionDto) {
        const { roleId, statusId, actionId } = updateDto;
        const existingPermission = await this.permissionRepository.findOne({
            where: {
                role: { RoleId: roleId },
                status: { StatusId: statusId },
                action: { actionId: actionId },
            },
        });
        if (existingPermission) {
            throw new ConflictException('Quyền này đã được thiết lập từ trước!');
        }
        await this.permissionRepository.update(id, {
            role: { RoleId: roleId } as any,
            status: { StatusId: statusId } as any,
            action: { actionId: actionId } as any,
        });
        return {
            message: 'Cập nhật quyền thành công!',
        };
    }
}
