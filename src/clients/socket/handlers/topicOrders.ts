import { notification } from "@/com/global/notification";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL as string;

export function topicOrders() {
  notification({
    title: "Novo Pedido",
    message: "Você recebeu um novo pedido.",
    onclick: () => {
      open(baseUrl.concat("/orders/edit?", "id=", "690e4dd8625895a5f86976ce"));
    },
  });
}
