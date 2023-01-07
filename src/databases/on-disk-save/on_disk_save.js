const fs = require('fs/promises');
const path = require('path');
const httpStatus = require('http-status');
const uuid = require('uuid').v4;
const errorReturn = require('../../utils/errorReturn');

const filePrefix = (fieldName) => {
  const arrayFieldName = String(fieldName).split('');
  if (arrayFieldName.at(-1) === 's') {
    arrayFieldName.pop();
  }
  return arrayFieldName.join('');
};

class OnDiskSave {
  constructor(folder) {
    this.fileDirectory = path.join(__dirname, '..', '..', '..', 'data', 'file', folder);
  }

  async save(files) {
    const context = 'OnDiskSave-save';

    // try to acces directory
    try {
      await fs.access(this.fileDirectory);
    } catch (accessCheckError) {
      if (accessCheckError.errno === -4058) {
        // if directory is not exist
        try {
          // eslint-disable-next-line security/detect-non-literal-fs-filename
          await fs.mkdir(this.fileDirectory, { recursive: true });
        } catch (mkdirError) {
          return errorReturn(
            httpStatus.INTERNAL_SERVER_ERROR,
            `Error save OnDiskSave - mkdirError - ${accessCheckError.message}`,
            context
          );
        }
      } else {
        // if other error occurs
        return errorReturn(
          httpStatus.INTERNAL_SERVER_ERROR,
          `Error save OnDiskSave - accessCheckError - ${accessCheckError.message}`,
          context
        );
      }
    }

    // copy file from temp directory to file directory
    const filenames = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      filenames.push(`${filePrefix(file.fieldname)}-${uuid()}${path.extname(file.originalname)}`);
      try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        await fs.writeFile(path.join(this.fileDirectory, filenames.at(-1)), file.buffer);
      } catch (writeFileError) {
        return errorReturn(
          httpStatus.INTERNAL_SERVER_ERROR,
          `Error save OnDiskSave - writeFileError - ${writeFileError.message}`,
          context
        );
      }
    }

    return { filenames };
  }

  async delete(filename) {
    const context = 'OnDiskSave-delete';

    try {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      await fs.unlink(path.join(this.fileDirectory, filename));
      return { message: 'File berhasil di hapus' };
    } catch (unlinkError) {
      return errorReturn(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Error delete OnDiskSave - unlinkError - ${unlinkError.message}`,
        context
      );
    }
  }
}

module.exports = OnDiskSave;
