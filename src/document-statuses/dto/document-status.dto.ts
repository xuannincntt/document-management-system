import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentStatusDto {
    @ApiProperty({ description: 'Mã trạng thái văn bản (duy nhất)', example: 'DRAFT' })
    @IsString()
    @IsNotEmpty({ message: 'Mã trạng thái không được để trống' })
    StatusCode: string;

    @ApiProperty({ description: 'Tên trạng thái văn bản', example: 'Bản nháp' })
    @IsString()
    @IsNotEmpty({ message: 'Tên trạng thái không được để trống' })
    StatusName: string;

    @ApiProperty({ description: 'Mã màu hiển thị', required: false, example: '#808080' })
    @IsString()
    @IsOptional()
    ColorCode?: string;

    @ApiProperty({ description: 'Thứ tự sắp xếp', required: false, default: 0 })
    @IsInt()
    @IsOptional()
    SortOrder?: number;
}

export class UpdateDocumentStatusDto {
    @ApiProperty({ description: 'Mã trạng thái văn bản', required: false })
    @IsString()
    @IsOptional()
    StatusCode?: string;

    @ApiProperty({ description: 'Tên trạng thái văn bản', required: false })
    @IsString()
    @IsOptional()
    StatusName?: string;

    @ApiProperty({ description: 'Mã màu hiển thị', required: false })
    @IsString()
    @IsOptional()
    ColorCode?: string;

    @ApiProperty({ description: 'Thứ tự sắp xếp', required: false })
    @IsInt()
    @IsOptional()
    SortOrder?: number;
}
