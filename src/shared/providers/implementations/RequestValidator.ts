import { IValidator } from "../IValidator";

class RequestValidator implements IValidator {
  validateParams(entry: object): boolean {
    let valid = true;

    Object.keys(entry).forEach((property) => {
      if (typeof entry[property] === "undefined") {
        valid = false;
        return;
      }

      valid = true;
    });

    return valid;
  }
}

export { RequestValidator };
