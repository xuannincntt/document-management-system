import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { WorkflowActionsService } from './workflow-actions.service';

@Controller('workflow-actions')
export class WorkflowActionsController {
    constructor(private readonly actionsService: WorkflowActionsService) { }

    @Get()
    async findAll() {
        return this.actionsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.actionsService.findOne(id);
    }
}
