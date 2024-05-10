export enum LogLevel {
  INFO,
  WARN,
  ERROR,
  LOG,
}

const colors = {
  INFO: "yellow",
  WARN: "orange",
  ERROR: "red",
  DEFAULT: "white",
};

export default class Logger {
  log(level: LogLevel, feature: string, message: string): void {
    switch (level) {
      case LogLevel.ERROR:
        this.error(feature, message);
        break;
      case LogLevel.INFO:
        this.info(feature, message);
        break;
      case LogLevel.WARN:
        this.warn(feature, message);
        break;
      case LogLevel.LOG:
        this.default(feature, message);
        break;
      default:
        this.default(feature, message);
        break;
    }
  }

  private info(feature: string, message: string): void {
    console.log(`%s Info: ${feature}: ${message}`, `color: ${colors["INFO"]}`);
  }
  private warn(feature: string, message: string): void {
    console.log(`%s Warn: ${feature}: ${message}`, `color: ${colors["WARN"]}`);
  }
  private error(feature: string, message: string): void {
    console.log(
      `%s Error: ${feature}: ${message}`,
      `color: ${colors["ERROR"]}`
    );
  }
  private default(feature: string, message: string): void {
    console.log(
      `%s Log: ${feature}: ${message}`,
      `color: ${colors["DEFAULT"]}`
    );
  }
}

export const logger = new Logger();
