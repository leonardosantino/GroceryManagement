"use client";

import { useEffect } from "react";

import { Col, Row, Scroll } from "@/com/ui/comps";

import { Billing } from "@/view/comps/analytics/billing";
import { Metric } from "@/view/comps/analytics/metric";
import { AnalyticsOrders } from "@/view/comps/analytics/orders";
import { BestSellers } from "@/view/comps/analytics/sales";

import { ws } from "@/clients/webSocketClient";
import { notificationPermission } from "@/com/global/notificationPermission";
import { notification } from "@/com/global/notification";

ws.onConnect = () => {
  ws.subscribe("/topic/orders", (message) => {
    console.log(message);
    notification({
      title: "Novo Pedido",
      message: "Um novo pedido foi realizado.",
    });
  });
};

export function Analytics() {
  useEffect(() => {
    notificationPermission();

    ws.activate();

    return () => {
      ws.deactivate();
    };
  }, []);

  return (
    <Scroll
      flex={1}
      padding={1}
      gap={3}
      marginLeft={12}
      testId="analytics-page"
    >
      <Row justify={"space-between"} gap={2}>
        <Metric title="Vendas" value="R$ 00,00" percent={0} />
        <Metric title="Pedidos" value="0" percent={0} />
        <Metric title="Clientes" value="0" percent={0} />
        <Metric title="Produtos" value="0" percent={0} />
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
