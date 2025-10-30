import {
  Col,
  Row,
  Paper,
  Text,
  Avatar,
  SvgIconComponent,
  TrendingDownIcon,
  TrendingUpIcon,
} from "@/com/ui/comps";

type Props = {
  title: string;
  value: string;
  percent: number;
  color: string;
  Icon: SvgIconComponent;
};

export function Metric({
  title,
  value,
  percent,
  Icon,
  color,
}: Readonly<Props>) {
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

      <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
        <Icon />
      </Avatar>
    </Paper>
  );
}
