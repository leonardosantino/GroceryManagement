"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ViewState = {
  view: string;
  setView: Dispatch<SetStateAction<string>>;
};

const ViewStateContext = createContext<ViewState>({} as ViewState);

export const ViewStateProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState("");

  return (
    <ViewStateContext.Provider value={{ view, setView }}>
      {children}
    </ViewStateContext.Provider>
  );
};

export const useViewState = () => {
  return useContext(ViewStateContext);
};
