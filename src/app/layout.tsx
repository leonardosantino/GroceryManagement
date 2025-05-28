import "@/app/global.css";

import { ReactNode } from "react";

import { RootLayoutProvider } from "@/common/provider";
import { ViewStateProvider } from "@/state/view";
import { defaultFont } from "@/common/ui/style/theme";

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
