import axios from "axios";

const baseURL = import.meta.env.VITE_ADMIN_BASE_URL;

console.log(baseURL);

const axiosApi = axios.create({
  baseURL,
});

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete config.headers["Authorization"];
  }
  return config;
});

export const get = async (url: string, ) => {
  return await axiosApi.get(url).then((res) => res.data);
};

export const post = async (url: string, data:{}, ) => {
  return await axiosApi.post(url, data ).then((res) => res.data);
};


export const put = async (url: string, data: {}) => {
  return await axiosApi.put(url, data).then((res) => res.data);
};
