import { Analytics } from "@/view/pages/analytics";
import { Customers } from "@/view/pages/customers";
import { Inventory } from "@/view/pages/inventory";
import { Orders } from "@/view/pages/orders";
import { ProductsAdd } from "@/view/pages/products/add";
import { ProductsList } from "@/view/pages/products/list";
import { Settings } from "@/view/pages/settings";

export enum ViewPath {
  Products = "products",
  ProductsAdd = "products-add",
  Orders = "orders",
  Customers = "customers",
  Inventory = "inventory",
  Settings = "settings",
  Analytics = "analytics",
  Default = "default",
}

export const ViewRoutes = {
  [ViewPath.Analytics]: <Analytics />,
  [ViewPath.Products]: <ProductsList />,
  [ViewPath.ProductsAdd]: <ProductsAdd />,
  [ViewPath.Orders]: <Orders />,
  [ViewPath.Customers]: <Customers />,
  [ViewPath.Inventory]: <Inventory />,
  [ViewPath.Settings]: <Settings />,
  [ViewPath.Default]: <Analytics />,
};
