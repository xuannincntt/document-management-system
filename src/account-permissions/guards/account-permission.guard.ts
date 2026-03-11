import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountPermissionsService } from '../account-permissions.service';
import { ACCOUNT_PERMISSION_KEY } from '../decorators/account-permission.decorator';

@Injectable()
export class AccountPermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private accountPermissionsService: AccountPermissionsService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const actionCode = this.reflector.getAllAndOverride<string>(ACCOUNT_PERMISSION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!actionCode) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user) {
            throw new ForbiddenException('Bạn cần đăng nhập để thực hiện thao tác này!');
        }

        // Luôn cho phép ADMIN thực hiện mọi thao tác (nếu bạn muốn giữ quy tắc này)
        if (user.roleCode === 'ADMIN') {
            return true;
        }

        const hasPermission = await this.accountPermissionsService.hasPermission(user.userId, actionCode);

        if (!hasPermission) {
            throw new ForbiddenException(`Bạn không có quyền thực hiện thao tác: ${actionCode}`);
        }

        return true;
    }
}
