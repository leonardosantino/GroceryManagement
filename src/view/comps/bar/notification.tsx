"use client";

import { MessageRounded, NotificationsRounded } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";

import { Row } from "@/com/ui";

export function NotificationBar() {
  return (
    <Row gap={2} paddingY={2} justify={"flex-end"}>
      <IconButton>
        <Badge badgeContent={1} color={"error"}>
          <NotificationsRounded />
        </Badge>
      </IconButton>

      <IconButton>
        <Badge badgeContent={2} color={"error"}>
          <MessageRounded />
        </Badge>
      </IconButton>
    </Row>
  );
}
