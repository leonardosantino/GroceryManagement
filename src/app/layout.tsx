import "@/app/global.css";

import { ReactNode } from "react";

import { appMetadata, appViewport } from "@/com/metadata/app";
import { RootLayoutProvider } from "@/com/provider/provider";
import { defaultFont } from "@/com/ui/style/theme";

export const viewport = appViewport;
export const metadata = appMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={defaultFont.className}>
        <RootLayoutProvider>{children}</RootLayoutProvider>
      </body>
    </html>
  );
}
