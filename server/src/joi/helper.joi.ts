import Joi from 'joi';
import type { PaginationInput } from '../interfaces/helper.interface';

export const paginateInputSchema = Joi.object<PaginationInput>({
  page: Joi.string().min(1).max(3).required(),
  per_page: Joi.string().min(1).max(3).required(),
});
