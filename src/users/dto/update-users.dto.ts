import { IsString, IsEmail, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsersDto {
    @ApiProperty({ description: 'Họ tên người dùng', required: false })
    @IsOptional()
    @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
    FullName?: string;

    @ApiProperty({ description: 'Email người dùng', required: false })
    @IsOptional()
    @IsEmail({}, { message: 'Email không hợp lệ' })
    Email?: string;

    @ApiProperty({ description: 'ID vai trò', required: false })
    @IsOptional()
    @IsInt({ message: 'RoleId phải là số nguyên' })
    RoleId?: number;

    @ApiProperty({ description: 'ID phòng ban', required: false })
    @IsOptional()
    @IsInt({ message: 'DepartmentId phải là số nguyên' })
    DepartmentId?: number;

    @ApiProperty({ description: 'Trạng thái hoạt động', required: false })
    @IsOptional()
    @IsBoolean({ message: 'Trạng thái hoạt động phải là kiểu boolean' })
    IsActive?: boolean;
}
