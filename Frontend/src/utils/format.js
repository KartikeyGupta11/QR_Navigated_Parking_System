export const formatCarNumber = (value) => {
  let v = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

  let stateCode = v.slice(0, 2).replace(/[^A-Z]/g, "");
  let districtCode = v.slice(2, 4).replace(/[^0-9]/g, "");
  let modelSeries = v.slice(4, 6).replace(/[^A-Z]/g, "");
  let uniqueValue = v.slice(6, 10).replace(/[^0-9]/g, "");

  let formatted = stateCode;

  if (districtCode) formatted += districtCode;
  if (modelSeries) formatted += " " + modelSeries;
  if (uniqueValue) formatted += " " + uniqueValue;

  return formatted;
};

export const isValidCarNumber = (car) => {
  return /^[A-Z]{2}[0-9]{2} [A-Z]{2} [0-9]{4}$/.test(car);
};

export const isValidPhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
