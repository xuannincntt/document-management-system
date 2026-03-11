import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentPermissionDto {
  @ApiProperty({ description: 'ID vai trò', example: 1 })
  @IsNotEmpty({ message: 'Vui lòng chọn Vai trò (RoleId)' })
  @IsInt({ message: 'RoleId phải là một số nguyên' })
  roleId: number;

  @ApiProperty({ description: 'ID trạng thái văn bản', example: 1 })
  @IsNotEmpty({ message: 'Vui lòng chọn Trạng thái (StatusId)' })
  @IsInt({ message: 'StatusId phải là một số nguyên' })
  statusId: number;

  @ApiProperty({ description: 'ID hành động workflow', example: 1 })
  @IsNotEmpty({ message: 'Vui lòng chọn Hành động (ActionId)' })
  @IsInt({ message: 'ActionId phải là một số nguyên' })
  actionId: number;
}