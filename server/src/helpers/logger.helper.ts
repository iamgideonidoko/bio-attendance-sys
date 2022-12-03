import { ILogger } from '../interfaces/helper.interface';

const logger: ILogger = {
  success(message: string, data?: unknown) {
    console.log('\x1b[32m%s\x1b[0m', `\n${message} ${data ?? ''}\n`);
  },
  error(message: string, data?: unknown) {
    console.log('\x1b[31m%s\x1b[0m', `\n${message} ${data ?? ''}\n`);
  },
  info(message: string, data?: unknown) {
    console.log('\x1b[34m%s\x1b[0m', `\n${message} ${data ?? ''}\n`);
  },
  successBg(message: string, data?: unknown) {
    console.log('\x1b[42m%s\x1b[0m', `\n${message} ${data ?? ''}\n`);
  },
  errorBg(message: string, data?: unknown) {
    console.log('\x1b[41m%s\x1b[0m', `\n${message} ${data ?? ''}\n`);
  },
  infoBg(message: string, data?: unknown) {
    console.log('\x1b[44m%s\x1b[0m', `\n${message} ${data ?? ''}\n`);
  },
};

export default logger;
