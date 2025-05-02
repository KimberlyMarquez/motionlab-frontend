import axios from "axios";

export default axios.create({
  baseURL: "https://motionlab-backend-b18l.onrender.com/",
  headers: { "Content-Type": "application/json" },
});
