import { Types as mongooseTypes } from 'mongoose';
import L from '../../common/logger'
import * as HttpStatus from 'http-status-codes';
import * as errors from "../../common/errors";

import { Example, IExampleModel } from '../models/example';

export class ExamplesService {

  async all(): Promise<IExampleModel[]> {
    L.info('fetch all examples');

    const docs = await Example
      .find()
      .lean()
      .exec() as IExampleModel[];

    return docs;
  }

  async byId(id: string): Promise<IExampleModel> {
    L.info(`fetch example with id ${id}`);

    if (!mongooseTypes.ObjectId.isValid(id)) throw new errors.HttpError(HttpStatus.BAD_REQUEST);

    const doc = await Example
      .findOne({ _id: id })
      .lean()
      .exec() as IExampleModel;

    if (!doc) throw new errors.HttpError(HttpStatus.NOT_FOUND);

    return doc;
  }

  async create(exampleData: IExampleModel): Promise<IExampleModel> {
    L.info(`create example with data ${exampleData}`);

    const example = new Example(exampleData);

    const doc = await example.save() as IExampleModel;

    return doc;
  }

  async patch(id: string, exampleData: IExampleModel): Promise<IExampleModel> {
    L.info(`update example with id ${id} with data ${exampleData}`);

    const doc = await Example
      .findOneAndUpdate({ _id: id }, { $set: exampleData }, { new: true })
      .lean()
      .exec() as IExampleModel;

    return doc;
  }

  async remove(id: string): Promise<void> {
    L.info(`delete example with id ${id}`);

    return await Example
      .findOneAndRemove({ _id: id })
      .lean()
      .exec();
  }
}

export default new ExamplesService();