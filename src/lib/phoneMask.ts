export const formatBRPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
  }
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
};

export const attachPhoneMask = (input: HTMLInputElement | null) => {
  if (!input) return;
  const handler = () => {
    const start = input.selectionStart || 0;
    input.value = formatBRPhone(input.value);
    // basic caret best-effort
    input.selectionStart = input.selectionEnd = Math.min(start, input.value.length);
  };
  input.addEventListener('input', handler);
  return () => input.removeEventListener('input', handler);
};

