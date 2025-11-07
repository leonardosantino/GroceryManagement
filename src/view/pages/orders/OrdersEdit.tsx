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
import { Order } from "@/model/entity/Order";

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

  const [data, setData] = useState(order as Order);

  // const mutationUpdate = useMutation({
  //   mutationFn: (it) => Api.orders.update(it),
  // });

  const [_errors, setErrors] = useState({});
  const [snack, setSnack] = useState<SnackData>({ open: false });

  async function onSave() {
    if (true) {
      setErrors({});
      setSnack({
        ...snackData.updateOrder,
        onClose: () => {
          setSnack({ open: false });
        },
      });
    } else {
      const formErrors = {};

      setSnack({
        ...snackData.requiredFieldsError,
        onClose: () => {
          setSnack({ open: false });
        },
      });

      setErrors(formErrors);
    }
  }

  if (isPending) return <Empty />;

  return (
    <Col
      flex={1}
      gap={1}
      padding={1}
      align={"center"}
      testId={"orders-edit-page"}
    >
      {/*Save*/}
      <Row justify={"space-between"} width={900}>
        <Col>
          <Text size={"small"}>Criado em: {toLocalDate(data.createdAt)}</Text>
          <Text size={"small"}>
            Última atualização: {toLocalDate(data.updatedAt)}
          </Text>
        </Col>

        <Row gap={1}>
          <Button
            color={"warning"}
            onClick={onSave}
            variant="outlined"

            // loading={mutationUpdate.isPending}
          >
            Atualizar Status
          </Button>
        </Row>
      </Row>

      {/*Save Feedback*/}
      <Snack data={snack} />

      <BoxSize height={6} />

      {/*Items*/}

      <Row justify={"space-between"} width={900}>
        <Col>
          <Text size={"large"} weight={"bold"}>
            Itens
          </Text>

          <BoxSize height={3} />

          <Paper>
            <Scroll padding={3}>
              {data?.items.map((item) => (
                <OrderItem key={"product-".concat(item.id)} item={item} />
              ))}
            </Scroll>
          </Paper>
        </Col>
        <Col>
          <Text size={"large"} weight={"bold"}>
            Entrega
          </Text>

          <BoxSize height={3} />

          <Text>
            Rua {data?.address.street}, {data?.address.number}
            <Space />
            {data?.address.complement}
            <Break />
            {data?.address.district} - {data?.address.city}
          </Text>
        </Col>
      </Row>

      <BoxSize height={6} />

      <Row justify={"space-between"} width={900}>
        <Col>
          <Text size={"large"} weight={"bold"}>
            Método de Pagamento
          </Text>
          <BoxSize height={3} />
          <Row>
            <Text>{data?.payment.method.description}</Text>
          </Row>
          <BoxSize height={3} />
          <Row justify={"space-between"}>
            <Text>Subtotal:</Text>
            <Text>{currencyFromDouble(data?.payment.amount)}</Text>
          </Row>

          <Row justify={"space-between"}>
            <Text>Entrega:</Text>
            <Text>{data?.payment.shipping}</Text>
          </Row>
          <Row justify={"space-between"}>
            <Text>Total:</Text>
            <Text>{currencyFromDouble(data?.payment.amount)}</Text>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
