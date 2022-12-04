const Datastore = require('nedb-promise');
const path = require('path');
const httpStatus = require('http-status');
const logger = require('../../config/logger');
const ApiError = require('../../utils/ApiError');

const errorReturn = (statusCode, message, context) => {
  logger.error(message, { context });
  return new ApiError(statusCode, message, context);
};

class NeDB {
  constructor(collectionName) {
    this.db = Datastore({
      filename: path.join(__dirname, '..', '..', '..', 'data', 'collection', `${collectionName}.db`),
      autoload: true,
      timestampData: true,
    });
  }

  async findOne(parameter) {
    const context = 'Nedb-findOne';
    try {
      const data = await this.db.findOne({ ...parameter, isActive: true });
      return data;
    } catch (err) {
      return errorReturn(httpStatus.INTERNAL_SERVER_ERROR, `Error findOne nedb ${err.message}`, context);
    }
  }

  async findMany(parameter, options) {
    const context = 'Nedb-findMany';

    try {
      const data = await this.db
        .cfind({ ...parameter, isActive: true })
        .skip(options.skip)
        .limit(options.limit)
        .sort(options.sortBy)
        .exec();
      return data;
    } catch (err) {
      return errorReturn(httpStatus.INTERNAL_SERVER_ERROR, `Error findMany nedb ${err.message}`, context);
    }
  }

  async count(parameter) {
    const context = 'Nedb-count';

    try {
      const data = await this.db.count({ ...parameter, isActive: true });
      return data;
    } catch (err) {
      return errorReturn(httpStatus.INTERNAL_SERVER_ERROR, `Error count nedb ${err.message}`, context);
    }
  }

  async insertOne(payload) {
    const context = 'Nedb-insertOne';

    try {
      const data = await this.db.insert({ ...payload, isActive: true });
      return data;
    } catch (err) {
      return errorReturn(httpStatus.INTERNAL_SERVER_ERROR, `Error insertOne nedb ${err.message}`, context);
    }
  }

  async updateOne(parameter, updateQuery) {
    const context = 'Nedb-updateOne';

    try {
      const updateParameter = { ...parameter, isActive: true };
      const updateData = await this.db.update(updateParameter, updateQuery, {});

      if (updateData === 0) {
        return errorReturn(httpStatus.INTERNAL_SERVER_ERROR, `Error updateOne nedb`, context);
      }
      const data = this.db.findOne(updateParameter);
      return data;
    } catch (err) {
      return errorReturn(httpStatus.INTERNAL_SERVER_ERROR, `Error updateOne nedb ${err.message}`, context);
    }
  }

  async deleteOne(parameter) {
    const context = 'Nedb-deleteOne';

    try {
      const deleteParameter = { ...parameter, isActive: true };
      const deleteData = await this.db.update(deleteParameter, { $set: { isActive: false } }, {});

      if (deleteData === 0) {
        return errorReturn(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete document', context);
      }
      return { numRemoved: deleteData };
    } catch (err) {
      return errorReturn(httpStatus.INTERNAL_SERVER_ERROR, `Error deleteOne nedb ${err.message}`, context);
    }
  }
}

module.exports = NeDB;
