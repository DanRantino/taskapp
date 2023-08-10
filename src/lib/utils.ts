import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loginSchema = z.object({
  email: z.string().email('Email inválido!'),
  password: z
    .string()
    .min(2, 'Senha deve ter ao menos 2 caracteres!')
    .max(50, 'Senha deve ter no máximo 50 caracteres!'),
});
