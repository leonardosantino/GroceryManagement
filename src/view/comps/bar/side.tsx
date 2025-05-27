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
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Col } from "@/common/ui/comps/col";
import { Paper } from "@/common/ui/comps/paper";
import { Text } from "@/common/ui/comps/text";
import { useViewState } from "@/state/view";

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

export function Sidebar() {
  const { view, setView } = useViewState();

  return (
    <Paper variant={"elevation"} sx={{ width: 200 }}>
      <Col sx={{ justifyContent: "center", padding: 1, height: 50 }}>
        <Text maxLength={20} sx={{ textAlign: "center" }}>
          Opção Supermercado
        </Text>
      </Col>

      <Divider />

      <List>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={view == item.id}
                onClick={() => setView(item.id)}
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
    </Paper>
  );
}
