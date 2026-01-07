import { io } from "socket.io-client";

const socket = io("http://localhost:5074", {
  withCredentials: true,
});

export default socket;
