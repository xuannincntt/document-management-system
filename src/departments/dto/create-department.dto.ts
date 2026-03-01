import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  DepartmentName: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  Description?: string;
}