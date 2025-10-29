import {
  Col,
  Row,
  ScrollCol,
  AttachMoneyIcon,
  InventoryIcon,
  PeopleIcon,
  ShoppingCartIcon,
  BoxSize,
} from "@/com/ui/comps";

import { Billing } from "@/view/comps/analytics/billing";
import { Metric } from "@/view/comps/analytics/metric";
import { AnalyticsOrders } from "@/view/comps/analytics/orders";
import { BestSellers } from "@/view/comps/analytics/sales";

export function Analytics() {
  return (
    <ScrollCol padding={2} gap={2} testId="analytics-page">
      <BoxSize height={1} />
      <Row justify={"space-between"} gap={2}>
        <Metric
          title="Vendas"
          value="R$ 4.231,00"
          change={12.5}
          Icon={AttachMoneyIcon}
          color="primary.main"
        />

        <Metric
          title="Pedidos"
          value="1.234"
          change={8.2}
          Icon={ShoppingCartIcon}
          color="success.main"
        />

        <Metric
          title="Clientes"
          value="892"
          change={-2.1}
          Icon={PeopleIcon}
          color="info.main"
        />

        <Metric
          title="Produtos"
          value="456"
          change={5.7}
          Icon={InventoryIcon}
          color="warning.main"
        />
      </Row>

      <Row justify={"space-between"} gap={1}>
        <Col gap={2}>
          <Billing />
          <AnalyticsOrders />
        </Col>

        <BestSellers />
      </Row>
    </ScrollCol>
  );
}
