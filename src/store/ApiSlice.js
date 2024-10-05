import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import axios from "axios";

// const apiService = axios.create({});

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: async (headers) => {
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("ngrok-skip-browser-warning", "69420");
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const { data, error } = result;

  if (error?.data?.message) toast.error(error?.data?.message);
  if (data?.message) toast.success(data?.message);

  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: [], // Use an empty array instead of an empty string
  endpoints: (builder) => ({}),
});

const getHeaders = (customheaders) => {
  const accessToken = localStorage.getItem("token");

  const defaultHeaders = {
    Accept: "application/json",
    authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const headers = {
    ...defaultHeaders,
    ...customheaders,
  };
  return headers;
};

export const postUserFormData = (path, payload) =>
  axios.post(`${process.env.REACT_APP_API_URL}${path}`, payload, {
    headers: getHeaders({ "Content-Type": "multipart/form-data" }),
  });
export const putUserFormData = (path, payload) =>
  axios.put(`${process.env.REACT_APP_API_URL}${path}`, payload, {
    headers: getHeaders({ "Content-Type": "multipart/form-data" }),
  });

export default apiSlice;
