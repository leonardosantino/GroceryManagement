import "@/common/ui/style/global.css";

import { ReactNode } from "react";

import { RootLayoutProvider } from "@/common/provider";
import { defaultFont } from "@/common/ui/font";

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
