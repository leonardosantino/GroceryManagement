import { Storage } from "@/clients/Storage";
import { useQuery } from "@tanstack/react-query";
import { useContext, createContext, ReactNode, useState } from "react";

type Data = {
  id?: string;
  token?: string | null;
  isAuth: boolean;
};

type DataState = {
  session: Data;
  isLoading: boolean;
  setSession: (session: {
    id: string;
    token: string;
    isPersistent: boolean;
  }) => void;
  deleteSession: () => void;
};

const SessionContext = createContext({} as DataState);

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [data, setData] = useState<Data>({ isAuth: false });

  const { isLoading } = useQuery({
    queryKey: [Storage.session.KEY],
    queryFn: () => getSession().then(() => data),
  });

  function setSession(session: {
    id: string;
    token: string;
    isPersistent: boolean;
  }) {
    Storage.session.setSession(session);

    setData({ ...session, isAuth: true });
  }

  async function getSession() {
    const session = Storage.session.getSession();

    setData(session);
  }

  function deleteSession() {
    Storage.session.deleteSession();

    setData({ isAuth: false });
  }

  return (
    <SessionContext.Provider
      value={{ session: data, isLoading, setSession, deleteSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}
