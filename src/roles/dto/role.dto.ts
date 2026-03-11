import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ description: 'Mã vai trò (duy nhất)', example: 'USER' })
    @IsString()
    @IsNotEmpty({ message: 'Mã vai trò không được để trống' })
    RoleCode: string;

    @ApiProperty({ description: 'Tên vai trò', example: 'Người dùng thông thường' })
    @IsString()
    @IsNotEmpty({ message: 'Tên vai trò không được để trống' })
    RoleName: string;

    @ApiProperty({ description: 'Mô tả vai trò', required: false })
    @IsString()
    @IsOptional()
    Description?: string;
}

export class UpdateRoleDto {
    @ApiProperty({ description: 'Mã vai trò', required: false })
    @IsString()
    @IsOptional()
    RoleCode?: string;

    @ApiProperty({ description: 'Tên vai trò', required: false })
    @IsString()
    @IsOptional()
    RoleName?: string;

    @ApiProperty({ description: 'Mô tả vai trò', required: false })
    @IsString()
    @IsOptional()
    Description?: string;
}
