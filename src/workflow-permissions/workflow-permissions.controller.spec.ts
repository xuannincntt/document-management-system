import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowPermissionsController } from './workflow-permissions.controller';

describe('WorkflowPermissionsController', () => {
  let controller: WorkflowPermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowPermissionsController],
    }).compile();

    controller = module.get<WorkflowPermissionsController>(WorkflowPermissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
