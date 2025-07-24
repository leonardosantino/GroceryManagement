"use client";

import { ViewRoutes } from "@/routes";
import { useViewState } from "@/state/view/view";

export function Main() {
  const { view } = useViewState();

  return ViewRoutes[view.path];
}
