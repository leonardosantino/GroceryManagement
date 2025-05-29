import { Analytics } from "@/view/pages/analytics";
import { Customers } from "@/view/pages/customers";
import { Inventory } from "@/view/pages/inventory";
import { Orders } from "@/view/pages/orders";
import { Products } from "@/view/pages/products";
import { Settings } from "@/view/pages/settings";

export enum ViewPath {
  Products = "products",
  Orders = "orders",
  Customers = "customers",
  Inventory = "inventory",
  Settings = "settings",
  Analytics = "analytics",
}

export const ViewRoutes = {
  [ViewPath.Analytics]: <Analytics />,
  [ViewPath.Products]: <Products />,
  [ViewPath.Orders]: <Orders />,
  [ViewPath.Customers]: <Customers />,
  [ViewPath.Inventory]: <Inventory />,
  [ViewPath.Settings]: <Settings />,
};
