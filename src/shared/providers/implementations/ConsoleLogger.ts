import { ILogger, LogType } from "../ILogger";

class ConsoleLogger implements ILogger {
  format(type: LogType, message: string): string {
    let prefix = "[INFO]";
    let color = "\x1b[36m";

    switch (type) {
      case LogType.INFO:
        prefix = "[INFO]";
        color = "\x1b[36m";
        break;

      case LogType.SUCCESS:
        prefix = "[SUCCESS]";
        color = "\x1b[32m";
        break;

      case LogType.WARNING:
        prefix = "[WARNING]";
        color = "\x1b[33m";
        break;

      case LogType.ERROR:
        prefix = "[ERROR]";
        color = "\x1b[31m";
        break;

      default:
        prefix = "[INFO]";
        color = "\x1b[36m";
    }

    return `${color}${prefix} ${message} \x1b[0m`;
  }

  log(type: LogType, message: string): void {
    console.log(this.format(type, message));
  }
}

export { ConsoleLogger };
