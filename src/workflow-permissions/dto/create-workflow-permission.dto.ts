import { IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateWorkflowPermissionDto {
  @IsNotEmpty({ message: 'Vui lòng chọn Vai trò (RoleId)' })
  @IsInt({ message: 'RoleId phải là một số nguyên' })
  roleId: number;

  @IsNotEmpty({ message: 'Vui lòng chọn Trạng thái (StatusId)' })
  @IsInt({ message: 'StatusId phải là một số nguyên' })
  statusId: number;

  @Transform(({ value }) => value?.trim().toUpperCase()) // Tự động cắt khoảng trắng và viết hoa
  @IsNotEmpty({ message: 'Hành động cho phép (AllowedAction) không được để trống' })
  @IsString()
  @Matches(/^[A-Z_]+$/, { 
    message: 'Hành động chỉ được chứa chữ cái in hoa và dấu gạch dưới (VD: EDIT_DRAFT, APPROVE)' 
  })
  allowedAction: string;
}