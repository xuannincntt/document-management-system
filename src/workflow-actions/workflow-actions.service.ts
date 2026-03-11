import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowAction } from './workflow-action.entity';

@Injectable()
export class WorkflowActionsService {
    constructor(
        @InjectRepository(WorkflowAction)
        private readonly actionRepository: Repository<WorkflowAction>,
    ) { }

    async findAll() {
        return this.actionRepository.find({ where: { isActive: true } });
    }

    async findOneByCode(code: string) {
        return this.actionRepository.findOne({ where: { actionCode: code } });
    }

    async findOne(id: number) {
        return this.actionRepository.findOne({ where: { actionId: id } });
    }
}
