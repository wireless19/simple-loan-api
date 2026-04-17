export function onlyLettersAndSpaces(str) {
  const regex = /^[A-Za-z\s]*$/;
  return regex.test(str);
}