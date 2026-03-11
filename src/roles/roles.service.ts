import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find();
    }

    async findOne(id: number): Promise<Role> {
        const role = await this.roleRepository.findOne({ where: { RoleId: id } });
        if (!role) throw new NotFoundException('Không tìm thấy vai trò');
        return role;
    }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const existingRole = await this.roleRepository.findOne({ where: { RoleCode: createRoleDto.RoleCode } });
        if (existingRole) throw new ConflictException('Mã vai trò đã tồn tại');

        const role = this.roleRepository.create(createRoleDto);
        return await this.roleRepository.save(role);
    }

    async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
        const role = await this.findOne(id);

        if (updateRoleDto.RoleCode && updateRoleDto.RoleCode !== role.RoleCode) {
            const existingRole = await this.roleRepository.findOne({ where: { RoleCode: updateRoleDto.RoleCode } });
            if (existingRole) throw new ConflictException('Mã vai trò mới đã tồn tại');
        }

        Object.assign(role, updateRoleDto);
        return await this.roleRepository.save(role);
    }

    async remove(id: number): Promise<{ message: string }> {
        const role = await this.findOne(id);
        await this.roleRepository.remove(role);
        return { message: 'Xóa vai trò thành công' };
    }
}
