import Promise from 'bluebird';
import L from '../../common/logger'
import * as HttpStatus from 'http-status-codes';
import * as errors from "../../common/errors";

let id = 0;
interface Example {
  id: number,
  name: string
};

const examples: Example[] = [
    { id: id++, name: 'example 0' }, 
    { id: id++, name: 'example 1' }
];

export class ExamplesService {
  all(): Promise<Example[]> {
    L.info(examples, 'fetch all examples');
    return Promise.resolve(examples);
  }

  byId(id: number): Promise<Example> {
    L.info(`fetch example with id ${id}`);
    if (!id) throw new errors.HttpError(HttpStatus.BAD_REQUEST);

    return this.all().then(r => r[id])
  }

  create(name: string): Promise<Example> {
    L.info(`create example with name ${name}`);
    const example: Example = {
      id: id++,
      name
    };
    examples.push(example)
    return Promise.resolve(example);
  }
}

export default new ExamplesService();