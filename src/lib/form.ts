import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function useZodForm<TSchema extends z.ZodType>(
  schema: TSchema,
  options?: Parameters<typeof useForm<z.infer<TSchema>>>[0]
) {
  return useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    ...options,
  });
}
