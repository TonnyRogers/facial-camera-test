/**
 * Utility functions for input masking
 */

/**
 * Apply mask to a value based on the mask pattern
 * @param value - The input value
 * @param mask - The mask pattern (e.g., "000.000.000-00")
 * @returns The masked value
 */
export function applyMask(value: string, mask: string): string {
  if (!mask || !value) return value;

  const cleanValue = value.replace(/\D/g, ''); // Remove non-digits
  let maskedValue = '';
  let valueIndex = 0;

  for (let i = 0; i < mask.length && valueIndex < cleanValue.length; i++) {
    const maskChar = mask[i];

    if (maskChar === '0' || maskChar === '9') {
      // Placeholder for digits
      maskedValue += cleanValue[valueIndex];
      valueIndex++;
    } else if (maskChar === 'a') {
      // Placeholder for letters
      if (/[a-zA-Z]/.test(cleanValue[valueIndex])) {
        maskedValue += cleanValue[valueIndex];
        valueIndex++;
      } else {
        break;
      }
    } else {
      // Static character (like dots, dashes, etc.)
      maskedValue += maskChar;
    }
  }

  return maskedValue;
}

/**
 * Extract unmasked value from a masked string
 * @param maskedValue - The masked value
 * @param mask - The mask pattern
 * @returns The unmasked value
 */
export function getUnmaskedValue(maskedValue: string, mask: string): string {
  if (!mask) return maskedValue;

  // For numeric masks, extract only digits
  if (mask.includes('0') || mask.includes('9')) {
    return maskedValue.replace(/\D/g, '');
  }

  // For alphanumeric masks, extract letters and numbers
  if (mask.includes('a')) {
    return maskedValue.replace(/[^a-zA-Z0-9]/g, '');
  }

  return maskedValue;
}

/**
 * Generate placeholder text based on mask pattern
 * @param mask - The mask pattern
 * @returns Placeholder text
 */
export function getMaskPlaceholder(mask: string): string {
  if (!mask) return '';

  return mask.replace(/0/g, '0').replace(/9/g, '0').replace(/a/g, 'X');
}

/**
 * Validate if a masked value is complete
 * @param maskedValue - The masked value
 * @param mask - The mask pattern
 * @returns True if the value is complete according to the mask
 */
export function isMaskComplete(maskedValue: string, mask: string): boolean {
  if (!mask) return true;

  const unmaskedValue = getUnmaskedValue(maskedValue, mask);
  const requiredLength = mask.replace(/[^0a9]/g, '').length;

  return unmaskedValue.length === requiredLength;
}

/**
 * Common mask patterns
 */
export const MASK_PATTERNS = {
  CPF: '000.000.000-00',
  PHONE: '(00) 00000-0000',
  CEP: '00000-000',
  DATE: '00/00/0000',
  CNPJ: '00.000.000/0000-00',
  CURRENCY: 'R$ 0.000,00',
  TIME: '00:00',
  CREDIT_CARD: '0000 0000 0000 0000',
} as const;

export type MaskPattern = keyof typeof MASK_PATTERNS;
