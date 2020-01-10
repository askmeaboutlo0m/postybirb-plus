import { Injectable, Logger } from '@nestjs/common';
import { TagGroupRepository } from './tag-group.repository';
import { EventsGateway } from 'src/events/events.gateway';
import { TagGroupEvent } from './enums/tag-group.events.enum';
import TagGroupEntity from './models/tag-group.entity';

@Injectable()
export class TagGroupService {
  private readonly logger = new Logger(TagGroupService.name);

  constructor(
    private readonly repository: TagGroupRepository,
    private readonly eventEmitter: EventsGateway,
  ) {}

  getAll() {
    return this.repository.find();
  }

  async create(tagGroup: TagGroupEntity) {
    this.logger.log(tagGroup, 'Create Tag Group');
    const newTagGroup = await this.repository.save(tagGroup);
    this.eventEmitter.emit(TagGroupEvent.CREATED, newTagGroup);
    return newTagGroup;
  }

  async update(tagGroup: TagGroupEntity) {
    this.logger.log(tagGroup.id, 'Update Tag Group');
    await this.repository.update(tagGroup);
    this.eventEmitter.emit(TagGroupEvent.UPDATED, tagGroup);
  }

  async deleteTagGroup(id: string) {
    this.logger.log(id, 'Delete Tag Group');
    await this.repository.remove(id);
    this.eventEmitter.emit(TagGroupEvent.REMOVED, id);
  }
}
