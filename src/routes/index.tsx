import { Analytics } from "@/view/pages/analytics";
import { Customers } from "@/view/pages/customers";
import { Inventory } from "@/view/pages/inventory";
import { Orders } from "@/view/pages/orders";
import { ProductsAdd } from "@/view/pages/products/add";
import { ProductsList } from "@/view/pages/products/list";
import { Settings } from "@/view/pages/settings";
import { ProductsEdit } from "@/view/pages/products/edit";

export enum ViewPath {
  Products = "products",
  ProductsAdd = "products-add",
  ProductsEdit = "products-edit",
  Orders = "orders",
  Customers = "customers",
  Inventory = "inventory",
  Settings = "settings",
  Analytics = "analytics",
  Default = "default",
}

export const ViewRoutes = {
  [ViewPath.Analytics]: <Analytics />,
  [ViewPath.ProductsAdd]: <ProductsAdd />,
  [ViewPath.ProductsEdit]: <ProductsEdit />,
  [ViewPath.Products]: <ProductsList />,
  [ViewPath.Orders]: <Orders />,
  [ViewPath.Customers]: <Customers />,
  [ViewPath.Inventory]: <Inventory />,
  [ViewPath.Settings]: <Settings />,
  [ViewPath.Default]: <Analytics />,
};
