export const minuteGuid = () => {
  const now = Date.now().toString();
  return now.substring(now.length - 5);
};
