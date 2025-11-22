import { Client } from "@stomp/stompjs";

export const webSocketClient = new Client({
  brokerURL: process.env.NEXT_PUBLIC_API_WS_URL,

  onConnect: () => {
    webSocketClient.subscribe("/topic/orders", (message) => {
      console.log(message.body);
      new Notification("Novo Pedido Recebido", {
        body: "Você recebeu uma novo pedido.",
        silent: false,
      });
    });
  },

  onDisconnect: () => {
    console.log("disconnect");
  },

  onStompError: (frame) => {
    console.error("stomp error", frame);
  },
});
