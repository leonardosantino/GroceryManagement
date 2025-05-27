import { useViewState } from "@/state/view";
import Analytics from "@/view/pages/analytics";
import Customers from "@/view/pages/customers";
import Inventory from "@/view/pages/inventory";
import Orders from "@/view/pages/orders";
import Products from "@/view/pages/products";
import Settings from "@/view/pages/settings";

export function Entry() {
  const { view } = useViewState();

  switch (view) {
    case "dashboard":
      return <Analytics />;
    case "products":
      return <Products />;
    case "orders":
      return <Orders />;
    case "customers":
      return <Customers />;
    case "inventory":
      return <Inventory />;
    case "settings":
      return <Settings />;
    case "analytics":
      return <Analytics />;
    case "":
      return <Analytics />;
    default:
      return "Not Found";
  }
}
