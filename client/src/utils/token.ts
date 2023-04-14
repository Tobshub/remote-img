const tokenName = "tobsmote-img-token";
const clientToken = {
  set: (value: string) => {
    localStorage.setItem(tokenName, value);
    return value;
  },
  get: () => {
    const token = localStorage.getItem(tokenName);
    return token;
  },
  remove: () => {
    const token = localStorage.getItem(tokenName);
    localStorage.removeItem(tokenName);
    return token;
  },
};

export default clientToken;
