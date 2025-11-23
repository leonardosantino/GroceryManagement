import { notification } from "@/com/global/notification";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL as string;

export function topicOrders(message: string) {
  const order = JSON.parse(message);

  notification({
    title: "Novo Pedido",
    message: "Você recebeu um novo pedido.",
    onclick: () => {
      open(baseUrl.concat("/orders/edit?", "id=", order.id));
    },
  });
}
