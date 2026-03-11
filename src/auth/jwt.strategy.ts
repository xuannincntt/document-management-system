import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'dms',
        });
    }

    async validate(payload: any) {
        const user = await this.userRepository.findOne({
            where: { UserId: payload.sub }
        });

        if (!user || !user.IsActive) {
            throw new UnauthorizedException('Tài khoản đã bị khóa hoặc không tồn tại');
        }

        return { userId: payload.sub, username: payload.username, roleCode: payload.roleCode };
    }
}