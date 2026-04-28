export const calculateAmount = (entryTime) => {
  if (!entryTime) {
    throw new Error("Invalid entry time");
  }

  const now = new Date();
  const durationMin = (now - entryTime) / (1000 * 60);

  let amount = 0;

  if (durationMin > 15) {
    amount = Math.ceil(durationMin / 30) * 10;
  }

  return {
    duration: Math.round(durationMin),
    amount,
  };
};
