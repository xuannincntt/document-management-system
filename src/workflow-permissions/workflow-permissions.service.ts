import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkflowPermission } from './workflow-permissions.entity';
import { Repository } from 'typeorm';
import { CreateWorkflowPermissionDto } from './dto/create-workflow-permission.dto';

@Injectable()
export class WorkflowPermissionsService {
    constructor(
        @InjectRepository(WorkflowPermission)
        private permissionRepository: Repository<WorkflowPermission>,
    ) { }
    async getAllPermissions() {
        return await this.permissionRepository.find({
            relations: ['role', 'status'],
        });
    }
    async createPermission(createDto: CreateWorkflowPermissionDto) {
        const { roleId, statusId, allowedAction } = createDto;
        const existingPermission = await this.permissionRepository.findOne({
            where: {
                role: { RoleId: roleId },
                status: { StatusId: statusId },
                allowedAction: allowedAction,
            },
        });
        if (existingPermission) {
            throw new ConflictException('Quyền này đã được thiết lập từ trước!');
        }
        const newPermission = this.permissionRepository.create({
            role: { RoleId: roleId },
            status: { StatusId: statusId },
            allowedAction: allowedAction,
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
    async updatePermission(id: number, updateDto: CreateWorkflowPermissionDto) {
        const { roleId, statusId, allowedAction } = updateDto;
        const existingPermission = await this.permissionRepository.findOne({
            where: {
                role: { RoleId: roleId },
                status: { StatusId: statusId },
                allowedAction: allowedAction,
            },
        });
        if (existingPermission) {
            throw new ConflictException('Quyền này đã được thiết lập từ trước!');
        }
        await this.permissionRepository.update(id, updateDto);
        return {
            message: 'Cập nhật quyền thành công!',
        };
    }
}
