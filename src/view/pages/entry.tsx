import { ViewRoutes } from "@/routes";
import { useViewState } from "@/state/view";

export function Entry() {
  const { view } = useViewState();

  return ViewRoutes[view];
}
