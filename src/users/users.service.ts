import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto, ChangePasswordDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }
    async getAllUsers(fullName?: string) {
        const query = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.Role', 'role')
            .leftJoinAndSelect('user.Department', 'department')
            .where('role.RoleCode != :roleCode', { roleCode: 'ADMIN' });

        if (fullName) {
            query.andWhere('user.FullName LIKE :fullName', { fullName: `%${fullName}%` });
        }

        return await query.getMany();
    }
    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findOne({
            where: { UserId: id },
            relations: ['Role', 'Department'],
        });
    }

    async updateProfile(userId: number, data: UpdateProfileDto) {
        const user = await this.userRepository.findOne({ where: { UserId: userId } });
        if (!user) throw new NotFoundException('Không tìm thấy người dùng');

        if (data.FullName) user.FullName = data.FullName;
        if (data.Email) user.Email = data.Email;

        await this.userRepository.save(user);
        return { message: 'Cập nhật thông tin cá nhân thành công' };
    }

    async changePassword(userId: number, data: ChangePasswordDto) {
        const user = await this.userRepository.findOne({ where: { UserId: userId } });
        if (!user) throw new NotFoundException('Không tìm thấy người dùng');

        const isPasswordValid = await bcrypt.compare(data.oldPassword, user.PasswordHash);
        if (!isPasswordValid) {
            throw new BadRequestException('Mật khẩu hiện tại không chính xác');
        }

        user.PasswordHash = await bcrypt.hash(data.newPassword, 10);
        await this.userRepository.save(user);

        return { message: 'Đổi mật khẩu thành công' };
    }

    async updateUser(userId: number, updateData: Partial<User>) {
        const user = await this.getUserById(userId);
        if (!user) throw new NotFoundException('Không tìm thấy người dùng');
        Object.assign(user, updateData);
        await this.userRepository.save(user);
        return { message: 'Cập nhật thông tin người dùng thành công!' };
    }
    async updateUserRole(userId: number, roleId: number) {
        const user = await this.getUserById(userId);
        if (!user) throw new NotFoundException('Không tìm thấy người dùng');
        user.RoleId = roleId;
        await this.userRepository.save(user);
        return { message: 'Cập nhật phân quyền thành công!' };
    }
    async blockUser(userId: number) {
        const user = await this.getUserById(userId);
        if (!user) throw new NotFoundException('Không tìm thấy người dùng');
        user.IsActive = false;
        await this.userRepository.save(user);
        return { message: 'Khóa tài khoản người dùng thành công!' };
    }
    async unblockUser(userId: number) {
        const user = await this.getUserById(userId);
        if (!user) throw new NotFoundException('Không tìm thấy người dùng');
        user.IsActive = true;
        await this.userRepository.save(user);
        return { message: 'Mở khóa tài khoản người dùng thành công!' };
    }
    async deleteUser(userId: number) {
        const user = await this.getUserById(userId);
        if (!user) throw new NotFoundException('Không tìm thấy người dùng');
        await this.userRepository.delete(userId);
        return { message: 'Xóa tài khoản người dùng thành công!' };
    }
}
