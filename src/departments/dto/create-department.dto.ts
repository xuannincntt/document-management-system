import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Tên phòng ban', example: 'Phòng Hành chính - Tổng hợp' })
  @IsString()
  @IsNotEmpty({ message: 'Tên phòng ban không được để trống' })
  @MaxLength(150)
  DepartmentName: string;

  @ApiProperty({ description: 'Mô tả chi tiết phòng ban', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  Description?: string;
}