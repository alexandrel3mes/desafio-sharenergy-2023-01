export default function cepIsValid(cep: string): boolean {
  cep = cep.replace(/[\s.-]*/gim, '');
  if (cep.length !== 8) return false;

  const regex = new RegExp('(^[0-9]{5})-?([0-9]{3}$)')

  return regex.test(cep)
}
