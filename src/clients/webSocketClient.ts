import { Client } from "@stomp/stompjs";

export const ws = new Client({
  brokerURL: process.env.NEXT_PUBLIC_API_WS_URL,
});
