import { Col, Row, Scroll } from "@/com/ui/comps";

import { Billing } from "@/view/comps/analytics/billing";
import { Metric } from "@/view/comps/analytics/metric";
import { AnalyticsOrders } from "@/view/comps/analytics/orders";
import { BestSellers } from "@/view/comps/analytics/sales";

export function Analytics() {
  return (
    <Scroll
      flex={1}
      padding={1}
      gap={3}
      marginLeft={12}
      testId="analytics-page"
    >
      <Row justify={"space-between"} gap={2}>
        <Metric title="Vendas" value="R$ 4.231,00" percent={12.5} />

        <Metric title="Pedidos" value="1.234" percent={8.2} />

        <Metric title="Clientes" value="892" percent={-2.1} />

        <Metric title="Produtos" value="456" percent={5.7} />
      </Row>

      <Row justify={"space-between"} gap={2}>
        <Col gap={2}>
          <Billing />
          <AnalyticsOrders />
        </Col>

        <BestSellers />
      </Row>
    </Scroll>
  );
}
