import axios from "axios";

const devUrl = "http://localhost:5001/api";
const prodUrl = "https://m7mad-task.onrender.com/api";

let myUrl = process.env.NODE_ENV === "production" ? prodUrl : devUrl;

export const Api = axios.create({
  baseURL: myUrl,
});
