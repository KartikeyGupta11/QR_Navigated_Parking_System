import axiosInstance from "./axiosInstance.js";

export const createEntry = async (data) => {
  const res = await axiosInstance.post("/entry", data);
  return res.data;
};

export const findSession = async (data) => {
  const res = await axiosInstance.post("/find-active-session", data);
  return res.data;
};

export const makePayment = async (data) => {
  const res = await axiosInstance.post("/make-payment", data);
  return res.data;
};

export const exitParking = async (data) => {
  const res = await axiosInstance.post("/exit", data);
  return res.data;
};

export const getEntryQR = async () => {
  const res = await axiosInstance.get("/qr/entry");
  return res.data;
};

export const getExitQR = async () => {
  const res = await axiosInstance.get("/qr/exit");
  return res.data;
};
