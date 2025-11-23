"use client";

import { useEffect } from "react";

import { Col, Row, Scroll } from "@/com/ui/comps";

import { Billing } from "@/view/comps/analytics/billing";
import { Metric } from "@/view/comps/analytics/metric";
import { AnalyticsOrders } from "@/view/comps/analytics/orders";
import { BestSellers } from "@/view/comps/analytics/sales";

import { webSocketClient } from "@/clients/webSocketClient";

export function Analytics() {
  useEffect(() => {
    notificationPermission();

    webSocketClient.activate();

    return () => {
      webSocketClient.deactivate();
    };
  }, []);

  function notificationPermission() {
    if (!globalThis.Notification) return;

    if (globalThis.Notification.permission !== "granted")
      Notification.requestPermission();
  }

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
