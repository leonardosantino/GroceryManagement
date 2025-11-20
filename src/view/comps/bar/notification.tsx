"use client";

import {
  Col,
  MessageIcon,
  NotificationsIcon,
  Badge,
  IconButton,
} from "@/com/ui/comps";

export function NotificationBar() {
  return (
    <Col gap={1} padding={1} marginX={2}>
      <IconButton>
        <Badge badgeContent={3} color={"error"}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <IconButton>
        <Badge badgeContent={5} color={"error"}>
          <MessageIcon />
        </Badge>
      </IconButton>
    </Col>
  );
}
