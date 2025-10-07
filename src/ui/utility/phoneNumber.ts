export function formatePhoneNumber(
  phoneNumber: string,
  countryCode: string = '+1'
) {
  let prepnedStr = '';
  phoneNumber = phoneNumber.toString();
  if (phoneNumber.startsWith(countryCode)) {
    prepnedStr = `${countryCode} `;
    phoneNumber = phoneNumber.replace(`${countryCode}`, '');
  }

  phoneNumber =
    prepnedStr +
    phoneNumber
      .replace(/\D+/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  return phoneNumber.trim();
}

export function cleanPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/\D+/g, '');
}
