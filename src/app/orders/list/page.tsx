import { Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";

import { OrdersList } from "@/view/pages/orders/OrdersList";

export default function OrdersPage() {
  return (
    <Container>
      <Sidebar />
      <OrdersList />
    </Container>
  );
}
