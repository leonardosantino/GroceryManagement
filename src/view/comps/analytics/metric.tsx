import {
  SvgIconComponent,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";

import { Avatar } from "@mui/material";

import { Col, Row, Paper, Text } from "@/com/ui";

type Props = {
  title: string;
  value: string;
  change: number;
  color: string;
  Icon: SvgIconComponent;
};

export function Metric({ title, value, change, Icon, color }: Readonly<Props>) {
  return (
    <Paper
      flex={1}
      wrap={"nowrap"}
      justify="space-between"
      align="center"
      gap={2}
      padding={1}
    >
      <Col gap={1}>
        <Text weight={"bold"}>{title}</Text>
        <Text size={"small"}>{value}</Text>

        <Row gap={1}>
          <Text size={"small"}>{Math.abs(change)}%</Text>
          {change > 0 ? (
            <TrendingUp sx={{ color: "success.main", fontSize: 16 }} />
          ) : (
            <TrendingDown sx={{ color: "error.main", fontSize: 16 }} />
          )}
        </Row>
      </Col>
      <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
        <Icon />
      </Avatar>
    </Paper>
  );
}
