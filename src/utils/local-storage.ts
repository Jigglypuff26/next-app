export const setLocalStorage = (name: string, body: object) => {
  localStorage.setItem(name, JSON.stringify(body));
};

export const removeLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};

export const getLocalStorage = (name: string) => {
  if (typeof window !== 'undefined') {
    const store = localStorage.getItem(name);
    if (store) {
      return JSON.parse(store);
    }
  }

  return null;
};
