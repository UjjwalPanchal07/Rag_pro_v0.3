import axios from "axios";

const API = axios.create({

  baseURL: "http://127.0.0.1:8000"

});

export const uploadRFPs = async (files, onProgress) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await API.post("/upload-rfp", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgress(percentCompleted);
    },
  });

  return res.data;
};

export default API;