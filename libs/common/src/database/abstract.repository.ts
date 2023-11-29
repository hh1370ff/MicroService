import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>) {
    console.log(
      '🚀 ~ file: abstract.repository.ts:11 ~ AbstractRepository<TDocument ~ c',
    );
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return createdDocument.save();
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });
    console.log(
      '🚀 ~ file: abstract.repository.ts:21 ~ AbstractRepository<TDocument ~ findOne ~ document:',
      document,
    );

    if (!document) {
      this.logger.warn(
        'Document not found with this filter Query',
        filterQuery,
      );
      throw new NotFoundException('Document not  found!');
    }
    return document as TDocument;
  }

  async findAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ) {
    const document = this.model.findOneAndUpdate(filterQuery, updateQuery, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(
        'Document not found with this filter Query',
        filterQuery,
      );
      throw new NotFoundException('Document not  found!');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
