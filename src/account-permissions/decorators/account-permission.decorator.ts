import { SetMetadata } from '@nestjs/common';

export const ACCOUNT_PERMISSION_KEY = 'account_permission';
export const AccountPermission = (actionCode: string) => SetMetadata(ACCOUNT_PERMISSION_KEY, actionCode);
