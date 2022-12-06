import type { BaseError } from '../interfaces/api.interface';

export const baseError = (error: unknown) => error as BaseError;
