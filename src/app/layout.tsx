import "@/app/global.css";

import { ReactNode } from "react";

import { RootLayoutProvider } from "@/common/provider";
import { defaultFont } from "@/common/ui/style/theme";
import { ViewStateProvider } from "@/state/view";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={defaultFont.className}>
        <RootLayoutProvider>
          <ViewStateProvider>{children}</ViewStateProvider>
        </RootLayoutProvider>
      </body>
    </html>
  );
}
