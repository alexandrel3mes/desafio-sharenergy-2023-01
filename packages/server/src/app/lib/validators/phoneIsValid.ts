export default function phoneIsValid(phone: string): boolean {
  phone = phone.replace(/[\s.-]*/gim, '');
  if (phone.length !== 11) return false;

  const regex = new RegExp('(^[0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4}$)')

  return regex.test(phone)
}
