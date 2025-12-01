"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import {
  Empty,
  Button,
  Col,
  Row,
  Text,
  BoxSize,
  Break,
  Space,
} from "@/com/ui/comps";

import { toYearMonthDayHourMinute } from "@/com/format/date";

import { Api } from "@/clients/Api";
import { Snack, SnackProps, DataSnack } from "@/view/comps/snack/Snack";

import { currencyFromDouble } from "@/com/format/currency";
import { OrderItem } from "@/view/comps/orders/OrderItem";
import { InputSelect } from "@/view/comps/InputSelect";
import { DataOrderStatus } from "@/com/consts/status";

export function OrdersEdit() {
  const params = useSearchParams();
  const id = params.get("id") as string;

  const { data, isPending, refetch } = useQuery({
    queryKey: ["order", id],
    queryFn: () => Api.orders.findById(id),
  });

  const [status, setStatus] = useState(data?.status.description);

  const { mutate } = useMutation({
    mutationFn: (it: { id: string; description: string }) =>
      Api.orders.updateStatus(it),
    onSuccess: onSuccess,
    onError: onError,
  });

  const [snack, setSnack] = useState<SnackProps>({ data: { open: false } });

  async function onSave() {
    mutate({ id, description: status as string });
  }

  function onSuccess() {
    setSnack({
      data: DataSnack.updateOrderStatus,
      onClose: () => setSnack({ data: { open: false } }),
    });

    refetch();
  }

  function onError() {
    setSnack({
      data: DataSnack.updateOrderStatusError,
      onClose: () => setSnack({ data: { open: false } }),
    });
  }

  function getStatus() {
    return status ?? data?.status.description;
  }

  function isSelectStatusDisabled() {
    const statusDescription = data?.status.description;
    return statusDescription == "Concluído" || statusDescription == "Cancelado";
  }

  function onUpdateStatus(it: string) {
    if (status !== it) setStatus(it);
  }

  function isStatusBtnDisabled() {
    if (!status) return true;

    return status === data?.status.description;
  }

  if (isPending) return <Empty />;

  return (
    <Col flex={1} padding={1} marginX={12} testId={"orders-edit-page"}>
      {/*Save Feedback*/}
      <Snack {...snack} />

      {/*Header*/}
      <Row justify={"space-between"} gap={4}>
        {/* Data */}
        <Col>
          <Text size={"small"}>
            Criado em: {toYearMonthDayHourMinute(data?.createdAt)}
          </Text>
          <Text size={"small"}>
            Última atualização: {toYearMonthDayHourMinute(data?.updatedAt)}
          </Text>
        </Col>

        <Row gap={4}>
          {/*Status Select*/}
          <InputSelect
            label={"Status"}
            options={DataOrderStatus}
            value={getStatus()}
            setValue={onUpdateStatus}
            disabled={isSelectStatusDisabled()}
          />
          {/*Update Button*/}
          <Button
            disabled={isStatusBtnDisabled()}
            color={"warning"}
            onClick={onSave}
            variant="outlined"
          >
            Atualizar Status
          </Button>
        </Row>
      </Row>

      <BoxSize height={8} />

      <Row justify={"space-between"} gap={4}>
        <Col gap={4}>
          {/*Order Code*/}
          <Col gap={3}>
            <Text size={"large"} weight={"bold"}>
              Pedido
            </Text>
            <Text>Nº {data?.code}</Text>
          </Col>

          {/*Items*/}
          <Col gap={3}>
            <Text size={"large"} weight={"bold"}>
              Itens
            </Text>

            <Col direction={"column"} gap={2}>
              {data?.items.map((item) => (
                <OrderItem key={"product-".concat(item.id)} item={item} />
              ))}
            </Col>
          </Col>
        </Col>
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
                <Text>{currencyFromDouble(data?.payment.shipping)}</Text>
              </Row>

              <BoxSize height={4} />

              <Row gap={4} justify={"space-between"}>
                <Text>Total:</Text>
                <Text>{currencyFromDouble(data?.payment.amount)}</Text>
              </Row>
            </Col>
          </Col>
        </Col>
      </Row>
    </Col>
  );
}
