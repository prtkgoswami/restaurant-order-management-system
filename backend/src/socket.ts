import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join_order", (orderId: string) => {
      socket.join(orderId);
    });

    io.on("disconnect", (socket) => {
      console.log("Socket Disconnected", socket.id);
    });

    socket.on("register_client", ({ role }) => {
      socket.data.role = role;
      console.log(`Socket ${socket.id} registered as ${role}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export const printSockets = async () => {
  const sockets = await io.fetchSockets();

  console.log(
    "Broadcasting event to sockets:",
    sockets.map((s) => `${s.id}:${s.data.role}`)
  );
};
