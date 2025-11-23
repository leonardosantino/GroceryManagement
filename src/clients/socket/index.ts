import { Client } from "@stomp/stompjs";

import { topicOrders } from "@/clients/socket/handlers/topicOrders";

export const ws = new Client({
  brokerURL: process.env.NEXT_PUBLIC_API_WS_URL,

  onConnect: () => {
    ws.subscribe("/topic/orders", topicOrders);
  },
});
