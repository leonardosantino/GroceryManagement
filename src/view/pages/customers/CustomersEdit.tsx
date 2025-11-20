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

import { InputSelect } from "@/view/comps/InputSelect";
import { Snack, SnackProps, DataSnack } from "@/view/comps/snack/Snack";
import { toLocalDate } from "@/com/format/date";

import { Api } from "@/clients/Api";

export function CustomersEdit() {
  const params = useSearchParams();
  const id = params.get("id") as string;

  const { data, isPending, refetch } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => Api.customers.findById(id),
  });

  const { data: address } = useQuery({
    queryKey: ["address", id],
    queryFn: () => Api.addresses.findByCustomerId(id),
  });

  const [status, setStatus] = useState(data?.status.description);

  const { mutate } = useMutation({
    mutationFn: (it: { id: string; description: string }) =>
      Api.customers.updateStatus(it),
    onSuccess: onSuccess,
    onError: onError,
  });

  const [snack, setSnack] = useState<SnackProps>({ data: { open: false } });
  const [isStatusBtnDisabled, setIsStatusBtnDisabled] = useState(true);

  async function onSave() {
    mutate({ id, description: status as string });
  }

  function onSuccess() {
    setIsStatusBtnDisabled(true);

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
    return statusDescription == "Inativo";
  }

  function onUpdateStatus(it: string) {
    if (status !== it) {
      setStatus(it);
      setIsStatusBtnDisabled(false);
    }
  }

  if (isPending) return <Empty />;

  return (
    <Col flex={1} padding={1} marginLeft={12} testId={"customers-edit-page"}>
      {/*FEEDBACK ON SAVE*/}
      <Snack {...snack} />

      <Row justify={"space-between"} gap={4}>
        {/* DATES */}
        <Col>
          <Text size={"small"}>Criado em: {toLocalDate(data?.createdAt)}</Text>
          <Text size={"small"}>
            Última atualização: {toLocalDate(data?.updatedAt)}
          </Text>
        </Col>

        <Row gap={4}>
          {/*Status Select*/}
          <InputSelect
            label={"Status"}
            options={["Ativo", "Bloqueado"]}
            value={getStatus()}
            setValue={onUpdateStatus}
            disabled={isSelectStatusDisabled()}
          />
          {/*Update Button*/}
          <Button
            disabled={isStatusBtnDisabled}
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
          {/*Customer*/}
          <Col gap={2}>
            <Text size={"large"} weight={"bold"}>
              Cliente
            </Text>

            <Col>
              <Row gap={1}>
                <Text>{data?.name}</Text>
                <Text>{data?.lastName}</Text>
              </Row>
              <Row gap={1}>
                <Text>{data?.phone.stateCode}</Text>
                <Text>{data?.phone.number}</Text>
              </Row>
            </Col>
          </Col>

          {/*Address*/}
          <Col gap={2}>
            <Text size={"large"} weight={"bold"}>
              Endereço
            </Text>

            <Text>
              Rua {address?.street}, {address?.number}
              <Space />
              {address?.complement}
              <Break />
              {address?.district} - {address?.city}
            </Text>
          </Col>
        </Col>
      </Row>
    </Col>
  );
}
