import { useContext, createContext, ReactNode, useState } from "react";

type Data = {
  token?: string | null;
  isAuth: boolean;
};

type DataState = {
  session: Data;
  isLoading: boolean;
  setSession: (session: string) => void;
};

import { Storage } from "@/clients/Storage";
import { useQuery } from "@tanstack/react-query";

const SessionContext = createContext({} as DataState);

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [data, setData] = useState<Data>({ isAuth: false });

  const { isLoading } = useQuery({
    queryKey: [`auth.session.storage`],
    queryFn: () => getSession().then(() => data),
  });

  function setSession(token: string) {
    Storage.session.setSession(token);
    const session = Storage.session.getSession();
    setData(session);
  }

  async function getSession() {
    const session = Storage.session.getSession();
    setData(session);
  }

  return (
    <SessionContext.Provider value={{ session: data, isLoading, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}
