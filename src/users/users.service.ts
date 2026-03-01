import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';


// Chưa viết file dto check dữ liệu đầu vào
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }
    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
    async getAllUsers() {
        return await this.userRepository.find({
            relations: ['role', 'status'],
        });
    }
    async updateUserRole(userId: number, roleId: number) {
        const user = await this.userRepository.findOne({ where: { UserId: userId } });
        if (!user) throw new NotFoundException('Không tìm thấy người dùng');
        user.RoleId = roleId;
        await this.userRepository.save(user);
        return { message: 'Cập nhật phân quyền thành công!' };
    }
    async blockUser(userId: number) {
        const user = await this.userRepository.findOne({ where: { UserId: userId } });
        if (!user) throw new NotFoundException('Không tìm thấy người dùng');
        user.IsActive = false;
        await this.userRepository.save(user);
        return { message: 'Khóa tài khoản người dùng thành công!' };
    }
    async unblockUser(userId: number) {
        const user = await this.userRepository.findOne({ where: { UserId: userId } });
        if (!user) throw new NotFoundException('Không tìm thấy người dùng');
        user.IsActive = true;
        await this.userRepository.save(user);
        return { message: 'Mở khóa tài khoản người dùng thành công!' };
    }
    async deleteUser(userId: number) {
        await this.userRepository.delete(userId);
        return { message: 'Xóa tài khoản người dùng thành công!' };
    }
}
