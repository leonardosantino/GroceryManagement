"use client";

import {
  Discount as DiscountsIcon,
  Inventory as ProductsIcon,
  LocalShipping as ShippingIcon,
  People as CustomersIcon,
  Settings as SettingsIcon,
  ShoppingCart as OrdersIcon,
  TrendingUp as AnalyticsIcon,
  Warehouse as InventoryIcon,
} from "@mui/icons-material";
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { Col } from "@/common/ui/comps/col";
import { Row } from "@/common/ui/comps/row";
import { Text } from "@/common/ui/comps/text";

const items = [
  { id: "products", label: "Products", icon: ProductsIcon },
  { id: "orders", label: "Orders", icon: OrdersIcon },
  { id: "customers", label: "Customers", icon: CustomersIcon },
  { id: "inventory", label: "Inventory", icon: InventoryIcon },
  { id: "analytics", label: "Analytics", icon: AnalyticsIcon },
  { id: "shipping", label: "Shipping", icon: ShippingIcon },
  { id: "discounts", label: "Discounts", icon: DiscountsIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

type SidebarProps = {
  activeView: string;
  setActiveView: (view: string) => void;
};

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <Card sx={{ width: 200 }}>
      <Col
        sx={{
          alignItems: "center",
          padding: 2,
        }}
      >
        <Text ellipsis>SELLER</Text>
      </Col>

      <Divider />

      <List>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={activeView === item.id}
                onClick={() => setActiveView(item.id)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
