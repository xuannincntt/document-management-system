import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/user.entity';
import { Department } from './departments/department.entity';
import { Role } from './roles/role.entity';
import { DocumentStatusesModule } from './document-statuses/document-statuses.module';
import { WorkflowPermissionsModule } from './workflow-permissions/workflow-permissions.module';
import { DocumentsModule } from './documents/documents.module';
import { DocumentAttachmentsModule } from './document-attachments/document-attachments.module';
import { DocumentTasksModule } from './document-tasks/document-tasks.module';
import { DocumentHistoriesModule } from './document-histories/document-histories.module';
import { DocumentStatus } from './document-statuses/document-statuses.entity';
import { WorkflowPermission } from './workflow-permissions/workflow-permissions.entity';
import { Document } from './documents/documents.entity';
import { DocumentAttachment } from './document-attachments/document-attachments.entity';
import { DocumentTask } from './document-tasks/document-tasks.entity';
import { DocumentHistory } from './document-histories/document-histories.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'yourStrong(!)Password',
      database: 'dms_db',
      entities: [
        User,
        Department,
        Role,
        DocumentStatus,
        WorkflowPermission,
        Document,
        DocumentAttachment,
        DocumentTask,
        DocumentHistory
      ],
      synchronize: false,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    UsersModule,
    AuthModule,
    DepartmentsModule,
    RolesModule,
    DocumentStatusesModule,
    WorkflowPermissionsModule,
    DocumentsModule,
    DocumentAttachmentsModule,
    DocumentTasksModule,
    DocumentHistoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
