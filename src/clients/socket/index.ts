import { Client } from "@stomp/stompjs";

import { topicOrders } from "@/clients/socket/handlers/topicOrders";
import { App } from "@/schema/app";

export const ws = new Client({
  brokerURL: process.env.NEXT_PUBLIC_API_WS_URL,

  onConnect: () => {
    ws.subscribe(
      "/topic/sellers/".concat(App.Seller.id, "/order"),
      ({ body }) => topicOrders(body),
    );
  },
});
