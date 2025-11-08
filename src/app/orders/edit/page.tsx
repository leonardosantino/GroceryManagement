import { Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";

import { OrdersEdit } from "@/view/pages/orders/OrdersEdit";

export default function OrdersEditPage() {
  return (
    <Container>
      <Sidebar />
      <OrdersEdit />
    </Container>
  );
}
