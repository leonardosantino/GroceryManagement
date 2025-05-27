import { useViewState } from "@/state/view";
import Analytics from "@/view/pages/analytics";
import Customers from "@/view/pages/customers";
import Inventory from "@/view/pages/inventory";
import Orders from "@/view/pages/orders";
import Products from "@/view/pages/products";
import Settings from "@/view/pages/settings";

export function Entry() {
  const { view } = useViewState();

  const routes = {
    ["analytics"]: <Analytics />,
    ["products"]: <Products />,
    ["orders"]: <Orders />,
    ["customers"]: <Customers />,
    ["inventory"]: <Inventory />,
    ["settings"]: <Settings />,
  };

  return routes[view];
}
