import { z } from 'zod';

/**
 * Validation schemas for masked inputs
 */

// CPF validation schema
export const cpfSchema = z
  .string({
    required_error: 'CPF é obrigatório',
  })
  .refine(
    value => {
      // Check if value is empty
      if (!value || value.trim() === '') {
        return false;
      }
      // Remove non-digits
      const cleanValue = value.replace(/\D/g, '');
      return cleanValue.length === 11;
    },
    {
      message: 'CPF deve ter 11 dígitos',
    }
  )
  .refine(
    value => {
      // Remove non-digits
      const cleanValue = value.replace(/\D/g, '');

      // Check if all digits are the same
      if (/^(\d)\1{10}$/.test(cleanValue)) {
        return false;
      }

      // Validate CPF algorithm
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanValue.charAt(i)) * (10 - i);
      }
      let remainder = 11 - (sum % 11);
      const firstDigit = remainder === 10 || remainder === 11 ? 0 : remainder;

      if (parseInt(cleanValue.charAt(9)) !== firstDigit) {
        return false;
      }

      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanValue.charAt(i)) * (11 - i);
      }
      remainder = 11 - (sum % 11);
      const secondDigit = remainder === 10 || remainder === 11 ? 0 : remainder;

      return parseInt(cleanValue.charAt(10)) === secondDigit;
    },
    {
      message: 'CPF inválido',
    }
  );

// Date validation schema
export const dateSchema = z
  .string({
    required_error: 'Data é obrigatória',
  })
  .refine(
    value => {
      // Check if value is empty
      if (!value || value.trim() === '') {
        return false;
      }
      // Remove non-digits
      const cleanValue = value.replace(/\D/g, '');
      return cleanValue.length === 8;
    },
    {
      message: 'Data deve ter 8 dígitos (DDMMAAAA)',
    }
  )
  .refine(
    value => {
      // Remove non-digits
      const cleanValue = value.replace(/\D/g, '');

      if (cleanValue.length !== 8) return false;

      const day = parseInt(cleanValue.substring(0, 2));
      const month = parseInt(cleanValue.substring(2, 4));
      const year = parseInt(cleanValue.substring(4, 8));

      // Basic date validation
      if (day < 1 || day > 31) return false;
      if (month < 1 || month > 12) return false;
      if (year < 1900 || year > new Date().getFullYear()) return false;

      // Check if date is valid
      const date = new Date(year, month - 1, day);
      return (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
      );
    },
    {
      message: 'Data inválida',
    }
  )
  .refine(
    value => {
      // Remove non-digits
      const cleanValue = value.replace(/\D/g, '');

      if (cleanValue.length !== 8) return false;

      const day = parseInt(cleanValue.substring(0, 2));
      const month = parseInt(cleanValue.substring(2, 4));
      const year = parseInt(cleanValue.substring(4, 8));

      // Check if person is at least 18 years old
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 18;
      }

      return age >= 18;
    },
    {
      message: 'Você deve ter pelo menos 18 anos',
    }
  );

// Phone validation schema
export const phoneSchema = z
  .string()
  .min(1, 'Telefone é obrigatório')
  .refine(
    value => {
      // Remove non-digits
      const cleanValue = value.replace(/\D/g, '');
      return cleanValue.length === 10 || cleanValue.length === 11;
    },
    {
      message: 'Telefone deve ter 10 ou 11 dígitos',
    }
  );

// CEP validation schema
export const cepSchema = z
  .string()
  .min(1, 'CEP é obrigatório')
  .refine(
    value => {
      // Remove non-digits
      const cleanValue = value.replace(/\D/g, '');
      return cleanValue.length === 8;
    },
    {
      message: 'CEP deve ter 8 dígitos',
    }
  );

// CNPJ validation schema
export const cnpjSchema = z
  .string()
  .min(1, 'CNPJ é obrigatório')
  .refine(
    value => {
      // Remove non-digits
      const cleanValue = value.replace(/\D/g, '');
      return cleanValue.length === 14;
    },
    {
      message: 'CNPJ deve ter 14 dígitos',
    }
  )
  .refine(
    value => {
      // Remove non-digits
      const cleanValue = value.replace(/\D/g, '');

      // Check if all digits are the same
      if (/^(\d)\1{13}$/.test(cleanValue)) {
        return false;
      }

      // Validate CNPJ algorithm
      let sum = 0;
      let weight = 2;

      // First digit
      for (let i = 11; i >= 0; i--) {
        sum += parseInt(cleanValue.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
      }

      let remainder = sum % 11;
      const firstDigit = remainder < 2 ? 0 : 11 - remainder;

      if (parseInt(cleanValue.charAt(12)) !== firstDigit) {
        return false;
      }

      // Second digit
      sum = 0;
      weight = 2;

      for (let i = 12; i >= 0; i--) {
        sum += parseInt(cleanValue.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
      }

      remainder = sum % 11;
      const secondDigit = remainder < 2 ? 0 : 11 - remainder;

      return parseInt(cleanValue.charAt(13)) === secondDigit;
    },
    {
      message: 'CNPJ inválido',
    }
  );
