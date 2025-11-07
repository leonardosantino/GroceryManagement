import { Col, Image, Row, Text } from "@/com/ui/comps";
import { currencyFromDouble } from "@/com/format/currency";
import { OrderItem as Item } from "@/model/aggregate/OrderItem";

export function OrderItem({ item }: Readonly<{ item: Item }>) {
  return (
    <Row align={"center"} gap={8}>
      <Text>{item.unity.quantity}</Text>

      <Image height={50} width={50} src={item.image} alt={item.name} />

      <Col flex={1}>
        <Text>{item.name}</Text>
        <Text>{item.unity.name}</Text>
      </Col>
      <Text>{currencyFromDouble(item.unity.quantity * item.unity.price)}</Text>
    </Row>
  );
}
