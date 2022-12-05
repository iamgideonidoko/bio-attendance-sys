export interface ILogger {
  success: (message: string, data?: unknown) => void;
  error: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  successBg: (message: string, data?: unknown) => void;
  errorBg: (message: string, data?: unknown) => void;
  infoBg: (message: string, data?: unknown) => void;
}

export interface PaginationInput {
  page: string;
  per_page: string;
}

export interface PaginationMeta {
  per_page: number;
  page: number;
  total_pages: number;
  total_items: number;
}

export interface PrismaBatchPayload {
  count: number;
}
