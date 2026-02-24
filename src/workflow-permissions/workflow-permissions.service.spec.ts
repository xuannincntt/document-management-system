import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowPermissionsService } from './workflow-permissions.service';

describe('WorkflowPermissionsService', () => {
  let service: WorkflowPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowPermissionsService],
    }).compile();

    service = module.get<WorkflowPermissionsService>(WorkflowPermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
