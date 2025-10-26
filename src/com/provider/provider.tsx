"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

import { theme } from "@/com/ui/schema/theme";
import { CacheTime } from "@/clients/http/CacheTime";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: CacheTime.H24,
    },
  },
});

export function RootLayoutProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [client] = useState(() => queryClient);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
