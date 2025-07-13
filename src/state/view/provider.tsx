"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";

import { ViewPath } from "@/routes";

type ViewState = {
  view: ViewPath;
  setView: Dispatch<SetStateAction<ViewPath>>;
};

export const ViewStateContext = createContext<ViewState>({} as ViewState);

export const ViewStateProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState(ViewPath.Default);

  const viewMemo = useMemo(() => ({ view, setView }), [view, setView]);

  return (
    <ViewStateContext.Provider value={viewMemo}>
      {children}
    </ViewStateContext.Provider>
  );
};
