import "@/app/global.css";

import { ReactNode } from "react";

import { appMetadata, appViewport } from "@/com/metadata/app";
import { RootLayoutProvider } from "@/com/provider";
import { defaultFont } from "@/com/ui/style/theme";
import { ViewStateProvider } from "@/state/view";

export const viewport = appViewport;
export const metadata = appMetadata;

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
