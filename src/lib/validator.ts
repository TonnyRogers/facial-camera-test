import { ZodSchema } from 'zod';

class Validator {
  async validateResponse<T>(data: unknown, schema?: ZodSchema): Promise<T> {
    if (schema) {
      return schema.parse(data) as T;
    }
    return data as T;
  }
}

export const validator = new Validator();
