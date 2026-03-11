import { IsString, IsEmail, IsOptional, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
    @ApiProperty({ description: 'Họ tên người dùng', required: false, example: 'Nguyễn Văn A' })
    @IsOptional()
    @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
    FullName?: string;

    @ApiProperty({ description: 'Email người dùng', required: false, example: 'user@example.com' })
    @IsOptional()
    @IsEmail({}, { message: 'Email không hợp lệ' })
    Email?: string;
}

export class ChangePasswordDto {
    @ApiProperty({ description: 'Mật khẩu hiện tại', example: '123456' })
    @IsNotEmpty({ message: 'Mật khẩu hiện tại không được để trống' })
    oldPassword: string;

    @ApiProperty({ description: 'Mật khẩu mới', example: 'newpassword123', minLength: 6 })
    @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
    @MinLength(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
    newPassword: string;
}
