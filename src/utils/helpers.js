export const isEmptyObject = (obj) => {
  return obj.constructor === Object && Object.entries(obj).length === 0;
};
