import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }
    async register(registerDto: RegisterDto) {
        try {
            const { username, password, fullName, email, departmentId } = registerDto;
            const existingUser = await this.userRepository.findOne({ where: { Username: username } });
            if (existingUser) {
                throw new BadRequestException('Tên đăng nhập đã tồn tại');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = this.userRepository.create({
                Username: username,
                PasswordHash: hashedPassword,
                FullName: fullName,
                Email: email,
                Role: { RoleId: 4 },
                Department: { DepartmentId: departmentId },
            });
            await this.userRepository.save(newUser);
            return { message: 'Đăng ký thành công', username: newUser.Username };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({
            where: { Username: loginDto.username },
            relations: ['Role'],
        });
        if (!user) {
            throw new UnauthorizedException('Tài khoản không tồn tại');
        }

        if (!user.IsActive) {
            throw new UnauthorizedException('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.PasswordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Mật khẩu không chính xác');
        }
        const payload = {
            sub: user.UserId,
            username: user.Username,
            roleCode: user.Role?.RoleCode
        };
        return {
            message: 'Đăng nhập thành công',
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
