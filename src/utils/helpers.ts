/**
 * Masks an input string to allow only valid decimal numbers.
 * @param value The input string
 * @param decimals Maximum number of decimal places allowed (default = 2)
 * @param decimalSeparator Character used as decimal separator (default = '.')
 * @returns Masked string containing only a valid decimal number
 */
export function maskDecimalInput(
  value: string,
  decimals: number = 2,
  decimalSeparator: string = '.'
): string {
  let clean = value.replace(new RegExp(`[^0-9${decimalSeparator}]`, 'g'), '');

  const parts = clean.split(decimalSeparator);
  if (parts.length > 2) {
    clean = parts[0] + decimalSeparator + parts.slice(1).join('');
  }

  const [integerPart, decimalPart] = clean.split(decimalSeparator);
  if (decimalPart && decimals > 0) {
    clean = integerPart + decimalSeparator + decimalPart.slice(0, decimals);
  }

  clean = clean.replace(/^0+(?=\d)/, '');

  return clean;
}

export function isTrutlyValue(
  value: string | number,
  type: 'string' | 'number'
) {
  const validationTypes = {
    string: () => {
      if (value !== '' && value !== null && value !== undefined) {
        return true;
      }
      return false;
    },
    number: () => {
      if (
        !Number.isNaN(value) &&
        value !== null &&
        value !== undefined &&
        value !== ''
      ) {
        return true;
      }
      return false;
    },
  };

  return validationTypes[type]();
}
