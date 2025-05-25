"use client";

import { MessageRounded, NotificationsRounded } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";

import { Row } from "@/common/ui/comps/row";

export function UpBar() {
  return (
    <Row
      sx={{
        justifyContent: "end",
        padding: 2,
        gap: 3,
      }}
    >
      <IconButton>
        <Badge badgeContent={4} color="error">
          <NotificationsRounded />
        </Badge>
      </IconButton>

      <IconButton>
        <Badge badgeContent={4} color="error">
          <MessageRounded />
        </Badge>
      </IconButton>
    </Row>
  );
}
