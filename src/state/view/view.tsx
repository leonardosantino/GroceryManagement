import { useContext } from "react";

import { ViewStateContext } from "@/state/view/provider";

export const useViewState = () => {
  return useContext(ViewStateContext);
};
