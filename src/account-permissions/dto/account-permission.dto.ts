import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountPermissionDto {
    @ApiProperty({ description: 'Danh sách ID người dùng', example: [1, 2] })
    @IsArray({ message: 'userIds phải là một mảng' })
    @ArrayNotEmpty({ message: 'Danh sách userIds không được để trống' })
    @IsInt({ each: true, message: 'Mỗi userId phải là số nguyên' })
    userIds: number[];

    @ApiProperty({ description: 'Danh sách ID thao tác', example: [101, 102] })
    @IsArray({ message: 'actionIds phải là một mảng' })
    @ArrayNotEmpty({ message: 'Danh sách actionIds không được để trống' })
    @IsInt({ each: true, message: 'Mỗi actionId phải là số nguyên' })
    actionIds: number[];
}
