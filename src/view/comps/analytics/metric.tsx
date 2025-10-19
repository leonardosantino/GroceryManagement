import {
  SvgIconComponent,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";

import { Avatar } from "@mui/material";

import { Col, Row, Paper, Text } from "@/com/ui";

type MetricProps = {
  title: string;
  value: string;
  change: number;
  Icon: SvgIconComponent;
  color: string;
};

export function Metric({
  title,
  value,
  change,
  Icon,
  color,
}: Readonly<MetricProps>) {
  return (
    <Paper>
      <Row justify="space-between" align="center" gap={2} padding={3}>
        <Col>
          <Text>{title}</Text>
          <Text>{value}</Text>
          <Col>
            {change > 0 ? (
              <TrendingUp sx={{ color: "success.main", fontSize: 16 }} />
            ) : (
              <TrendingDown sx={{ color: "error.main", fontSize: 16 }} />
            )}
            <Text>{Math.abs(change)}%</Text>
          </Col>
        </Col>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
          <Icon />
        </Avatar>
      </Row>
    </Paper>
  );
}
