import axiosInstance from "./axiosInstance.js";

export const createEntry = async (data) => {
  const res = await axiosInstance.post("/parking/entry", data);
  return res.data;
};

export const findSession = async (data) => {
  const res = await axiosInstance.post("/parking/find-active-session", data);
  return res.data;
};

export const makePayment = async (data) => {
  const res = await axiosInstance.post("/parking/make-payment", data);
  return res.data;
};

export const exitParking = async (data) => {
  const res = await axiosInstance.post("/parking/exit", data);
  return res.data;
};

export const getEntryQR = async () => {
  const res = await axiosInstance.get("/parking/qr/entry");
  return res.data;
};

export const getExitQR = async () => {
  const res = await axiosInstance.get("/parking/qr/exit");
  return res.data;
};

export const getAllParkingAreas = async () => {
  const res = await axiosInstance.get("/parking/parking-areas");
  return res.data;
};
