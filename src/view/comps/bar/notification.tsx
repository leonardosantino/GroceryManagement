"use client";

import {
  Row,
  MessageIcon,
  NotificationsIcon,
  Badge,
  IconButton,
} from "@/com/ui/comps";

export function NotificationBar() {
  return (
    <Row gap={2} padding={2} justify={"flex-end"}>
      <IconButton>
        <Badge badgeContent={1} color={"error"}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <IconButton>
        <Badge badgeContent={2} color={"error"}>
          <MessageIcon />
        </Badge>
      </IconButton>
    </Row>
  );
}
