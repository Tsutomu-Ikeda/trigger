export const commafy = (num: number) => {
  const str = num.toString().split('.');
  str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  if (str[1]) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}