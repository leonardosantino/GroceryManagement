"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import {
  Empty,
  Button,
  Col,
  Row,
  Scroll,
  Text,
  BoxSize,
  Paper,
  Break,
  Space,
} from "@/com/ui/comps";

import { toLocalDate } from "@/com/format/date";

import { Api } from "@/clients/Api";
import { Snack, SnackData, snackData } from "@/view/comps/snack/Snack";

import { currencyFromDouble } from "@/com/format/currency";
import { OrderItem } from "@/view/comps/orders/OrderItem";

export function OrdersEdit() {
  const params = useSearchParams();
  const id = params.get("id") as string;

  const { data: order, isPending } = useQuery({
    queryKey: ["order", id],
    queryFn: () =>
      Api.orders.findById(id).then((it) => {
        setData(it);
        return it;
      }),
  });

  const [data, setData] = useState(order);

  // const mutationUpdate = useMutation({
  //   mutationFn: (it) => Api.orders.update(it),
  // });

  const [snack, setSnack] = useState<SnackData>({ open: false });

  async function onSave() {
    setSnack({
      ...snackData.updateOrder,
      onClose: () => {
        setSnack({ open: false });
      },
    });
  }

  if (isPending) return <Empty />;

  return (
    <Col flex={1} padding={1} marginX={12} testId={"orders-edit-page"}>
      {/*Save Feedback*/}
      <Snack data={snack} />

      {/*Header*/}
      <Row justify={"space-between"} gap={4}>
        {/* Data */}
        <Col>
          <Text size={"small"}>Criado em: {toLocalDate(data?.createdAt)}</Text>
          <Text size={"small"}>
            Última atualização: {toLocalDate(data?.updatedAt)}
          </Text>
        </Col>

        {/*Update Button*/}
        <Button color={"warning"} onClick={onSave} variant="outlined">
          Atualizar Status
        </Button>
      </Row>

      <BoxSize height={8} />

      <Row justify={"space-between"} gap={4}>
        <Col gap={4}>
          {/*Customer*/}
          <Col gap={2}>
            <Text size={"large"} weight={"bold"}>
              Cliente
            </Text>

            <Col>
              <Row gap={1}>
                <Text>{data?.customer.name}</Text>
                <Text>{data?.customer.lastName}</Text>
              </Row>
              <Row gap={1}>
                <Text>{data?.customer.phone.stateCode}</Text>
                <Text>{data?.customer.phone.number}</Text>
              </Row>
            </Col>
          </Col>

          {/*Address*/}
          <Col gap={2}>
            <Text size={"large"} weight={"bold"}>
              Endereço
            </Text>

            <Text>
              Rua {data?.address.street}, {data?.address.number}
              <Space />
              {data?.address.complement}
              <Break />
              {data?.address.district} - {data?.address.city}
            </Text>
          </Col>
          {/*Payment*/}
          <Col gap={2}>
            <Text size={"large"} weight={"bold"}>
              Pagamento
            </Text>

            <Text>{data?.payment.method.description}</Text>

            <Col>
              <Row gap={4} justify={"space-between"}>
                <Text>Subtotal:</Text>
                <Text>{currencyFromDouble(data?.payment.amount)}</Text>
              </Row>

              <Row gap={4} justify={"space-between"}>
                <Text>Entrega:</Text>
                <Text>{data?.payment.shipping}</Text>
              </Row>
              <Row gap={4} justify={"space-between"}>
                <Text>Total:</Text>
                <Text>{currencyFromDouble(data?.payment.amount)}</Text>
              </Row>
            </Col>
          </Col>
        </Col>

        {/*Items*/}
        <Col gap={3}>
          <Text size={"large"} weight={"bold"}>
            Itens
          </Text>

          <Paper padding={2}>
            {data?.items.map((item) => (
              <OrderItem key={"product-".concat(item.id)} item={item} />
            ))}
          </Paper>
        </Col>
      </Row>
    </Col>
  );
}
