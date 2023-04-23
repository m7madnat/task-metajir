import axios from "axios";

let myUrl = "http://localhost:5001/api";

if (process.env.NODE_ENV === "production") {
  myUrl = "https://m7mad-task.onrender.com/api";
}
export const Api = axios.create({
  baseURL: myUrl,
});
