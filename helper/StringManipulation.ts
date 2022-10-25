export const makeid = (length: number) => {
  let result: string = '';
  const characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength: number = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateNewsUrl = (title: string) => {
  const result: string = title.toLowerCase().replaceAll(' ', '-').replace(/[^-0-9a-z]/gi, '');
  return result;
};
