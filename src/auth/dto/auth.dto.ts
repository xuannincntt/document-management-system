import { IsString, IsNotEmpty, MinLength, IsEmail, IsInt, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Tên đăng nhập', example: 'Admin' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @IsString()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Tên đăng nhập viết liền không dấu, không chứa khoảng trắng và không chứa ký tự đặc biệt (chỉ cho phép dấu gạch dưới)'
  })
  username: string;

  @ApiProperty({ description: 'Mật khẩu', example: '123456', minLength: 6 })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @ApiProperty({ description: 'Họ tên đầy đủ', example: 'Nguyễn Văn A' })
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Địa chỉ Email', example: 'user@example.com', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @ApiProperty({ description: 'ID Phòng ban', example: 1 })
  @IsNotEmpty({ message: 'Vui lòng chọn Phòng ban' })
  @IsInt()
  departmentId: number;
}

export class LoginDto {
  @ApiProperty({ description: 'Tên đăng nhập', example: 'Admin' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Mật khẩu', example: '123456' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString()
  password: string;
}