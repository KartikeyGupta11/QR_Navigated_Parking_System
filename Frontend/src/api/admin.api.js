import axiosInstance from "./axiosInstance";

export const getDashboardStats = async () => {
  const res = await axiosInstance.get("/admin/stats");
  return res.data;
};

export const getAllSessions = async () => {
  const res = await axiosInstance.get("/admin/sessions");
  return res.data;
};

export const getAllSlots = async () => {
  const res = await axiosInstance.get("/admin/slots");
  return res.data;
};
