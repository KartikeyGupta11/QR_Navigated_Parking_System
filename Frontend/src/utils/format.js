export const formatCarNumber = (value) => {
  let v = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (v.length > 4) {
    v = v.slice(0, 4) + " " + v.slice(4);
  }

  if (v.length > 9) {
    v = v.slice(0, 9) + " " + v.slice(9, 13);
  }

  return v;
};

export const isValidPhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};
