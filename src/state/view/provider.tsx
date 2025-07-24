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

type View = { path: ViewPath; data: Record<string, string> };

type ViewState = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
};

export const ViewStateContext = createContext<ViewState>({} as ViewState);

export const ViewStateProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState({ path: ViewPath.Default, data: {} });

  const viewMemo = useMemo(() => ({ view, setView }), [view, setView]);

  return (
    <ViewStateContext.Provider value={viewMemo}>
      {children}
    </ViewStateContext.Provider>
  );
};
