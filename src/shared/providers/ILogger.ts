enum LogType {
  SUCCESS,
  WARNING,
  ERROR,
  INFO,
}

interface ILogger {
  format(type: LogType, message: string): string;
  log(type: LogType, message: string): void;
}

export { LogType, ILogger };
