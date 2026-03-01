import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty({ message: 'Tiêu đề văn bản không được để trống' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;
}