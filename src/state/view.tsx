"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { ViewPath } from "@/routes";

type ViewState = {
  view: ViewPath;
  setView: Dispatch<SetStateAction<ViewPath>>;
};

const ViewStateContext = createContext<ViewState>({} as ViewState);

export const ViewStateProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState(ViewPath.Analytics);

  return (
    <ViewStateContext.Provider value={{ view, setView }}>
      {children}
    </ViewStateContext.Provider>
  );
};

export const useViewState = () => {
  return useContext(ViewStateContext);
};
