"use client";

import { ReactNode } from "react";

import SignIn from "@/view/pages/signin/signin";

import { Conditional, Empty } from "@/com/ui/comps";
import { useSession } from "@/com/provider/data/SessionProvider";

export function ProtectedProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { session, isLoading } = useSession();

  if (isLoading) return <Empty />;

  return (
    <Conditional bool={session.isAuth} childrenAlt={<SignIn />}>
      {children}
    </Conditional>
  );
}
