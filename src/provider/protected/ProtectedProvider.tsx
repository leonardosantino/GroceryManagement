"use client";

import { ReactNode } from "react";

import SignIn from "@/view/pages/SignIn";

import { Conditional, Empty } from "@/com/ui/comps";
import { useSession } from "@/provider/data/SessionProvider";
import { onAuth } from "@/provider/protected/onAuth";

export function ProtectedProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const {
    session: { isAuth },
    isLoading,
  } = useSession();

  onAuth({ isLoading, isAuth });

  if (isLoading) return <Empty />;

  return (
    <Conditional bool={isAuth} childrenAlt={<SignIn />}>
      {children}
    </Conditional>
  );
}
