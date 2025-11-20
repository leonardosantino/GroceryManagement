import {
  Col,
  Row,
  Paper,
  Text,
  TrendingDownIcon,
  TrendingUpIcon,
} from "@/com/ui/comps";

type Props = {
  title: string;
  value: string;
  percent: number;
};

export function Metric({ title, value, percent }: Readonly<Props>) {
  return (
    <Paper
      flex={1}
      justify={"space-between"}
      align={"center"}
      wrap={"nowrap"}
      gap={1}
      padding={1}
    >
      <Col>
        <Text weight={"bold"}>{title}</Text>

        <Col padding={2}>
          <Text size={"small"}>{value}</Text>

          <Row gap={1}>
            <Text size={"small"}>{Math.abs(percent)}%</Text>

            {percent > 0 ? (
              <TrendingUpIcon sx={{ color: "success.main", fontSize: 16 }} />
            ) : (
              <TrendingDownIcon sx={{ color: "error.main", fontSize: 16 }} />
            )}
          </Row>
        </Col>
      </Col>
    </Paper>
  );
}
