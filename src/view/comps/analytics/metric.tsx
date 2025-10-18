import {
  SvgIconComponent,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import { Avatar, Box, Card, Typography } from "@mui/material";

import { Col, Row } from "@/com/ui";

type MetricProps = {
  title: string;
  value: string;
  change: number;
  Icon: SvgIconComponent;
  color: string;
};

export function Metric({ title, value, change, Icon, color }: MetricProps) {
  return (
    <Card>
      <Row justify="space-between" align="center" gap={2} padding={3}>
        <Col>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
            {value}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            {change > 0 ? (
              <TrendingUp sx={{ color: "success.main", fontSize: 16 }} />
            ) : (
              <TrendingDown sx={{ color: "error.main", fontSize: 16 }} />
            )}
            <Typography
              variant="body2"
              sx={{
                color: change > 0 ? "success.main" : "error.main",
                ml: 0.5,
              }}
            >
              {Math.abs(change)}%
            </Typography>
          </Box>
        </Col>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
          <Icon />
        </Avatar>
      </Row>
    </Card>
  );
}
