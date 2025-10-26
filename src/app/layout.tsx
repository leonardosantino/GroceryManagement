import "@/app/global.css";

import { ReactNode } from "react";

import { appMetadata, appViewport } from "@/com/metadata/app";
import { RootLayoutProvider } from "@/com/provider/provider";
import { defaultFont } from "@/com/ui/schema/theme";

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = appViewport;
export const metadata: Metadata = appMetadata;

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
