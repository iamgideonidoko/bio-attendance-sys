export interface ILogger {
  success: (message: string, data?: unknown) => void;
  error: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  successBg: (message: string, data?: unknown) => void;
  errorBg: (message: string, data?: unknown) => void;
  infoBg: (message: string, data?: unknown) => void;
}
