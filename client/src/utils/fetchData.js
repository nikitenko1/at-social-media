import axios from 'axios';

export const getDataAPI = async (url, token) => {
  const res = axios.get(`/api/${url}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
export const postDataAPI = async (url, post, token) => {
  const res = axios.post(`/api/${url}`, post, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
export const putDataAPI = async (url, post, token) => {
  const res = axios.put(`/api/${url}`, post, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
export const patchDataAPI = async (url, post, token) => {
  const res = axios.patch(`/api/${url}`, post, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
export const deleteDataAPI = async (url, token) => {
  const res = axios.delete(`/api/${url}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
