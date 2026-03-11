import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchUserDto {
    @ApiProperty({
        description: 'Tên nhân viên cần tìm kiếm (tương đối)',
        required: false,
        example: 'Nguyễn'
    })
    @IsOptional()
    @IsString({ message: 'Tên tìm kiếm phải là chuỗi ký tự' })
    fullName?: string;
}
