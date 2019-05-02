export class ImportError extends Error {}

export class ImportInvalidFileError extends ImportError {
  constructor() {
    super('Invalid file.');
    Object.setPrototypeOf(this, ImportInvalidFileError.prototype);
  }
}

export class ImportUnreadableFileError extends ImportError {
  constructor() {
      super('Failed to read file.');
      Object.setPrototypeOf(this, ImportUnreadableFileError.prototype);
  }
}
