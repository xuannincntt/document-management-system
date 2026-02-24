import { IsString, IsNotEmpty, MinLength, IsEmail, IsInt, IsOptional, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @IsString()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Tên đăng nhập viết liền không dấu, không chứa khoảng trắng và không chứa ký tự đặc biệt (chỉ cho phép dấu gạch dưới)'
  })
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @IsString()
  fullName: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @IsNotEmpty({ message: 'Vui lòng chọn Vai trò' })
  @IsInt()
  roleId: number;

  @IsNotEmpty({ message: 'Vui lòng chọn Phòng ban' })
  @IsInt()
  departmentId: number;
}

export class LoginDto {
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString()
  password: string;
}