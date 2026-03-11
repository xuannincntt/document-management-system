import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ description: 'Tiêu đề văn bản', example: 'Công văn đi số 123' })
  @IsNotEmpty({ message: 'Tiêu đề văn bản không được để trống' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Nội dung vắn tắt hoặc chi tiết văn bản', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'ID người nhận', required: false, example: 2 })
  @IsOptional()
  @IsInt({ message: 'ReceiverId phải là một số nguyên' })
  receiverId?: number;
}