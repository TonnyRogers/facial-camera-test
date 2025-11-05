import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Função para formatar datas
export function formatDate(
  dateString: string,
  formatString: string = 'dd/MM/yyyy'
) {
  try {
    const date = parseISO(dateString);
    return format(date, formatString, { locale: ptBR });
  } catch {
    return dateString;
  }
}

// Função para formatar valores em moeda
export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

// Função para truncar texto
export function truncateText(text: string, maxLength: number = 100) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

// Função para converter data ISO (YYYY-MM-DD) para formato brasileiro (DD/MM/AAAA)
export function convertISOToBrazilian(isoDate: string): string {
  try {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  } catch {
    return isoDate;
  }
}

// Função para converter data brasileira (DD/MM/AAAA) para formato ISO (YYYY-MM-DD)
export function convertBrazilianToISO(brazilianDate: string): string {
  try {
    const [day, month, year] = brazilianDate.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  } catch {
    return brazilianDate;
  }
}
