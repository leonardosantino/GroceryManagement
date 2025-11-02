import "@testing-library/jest-dom";

import { ReactElement, ReactNode } from "react";

import {
  render as testRender,
  screen as testScreen,
} from "@testing-library/react";

import { userEvent as event } from "@testing-library/user-event";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClientTest = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      retry: false,
    },
  },
});

function AllTheProviders({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <QueryClientProvider client={queryClientTest}>
      {children}
    </QueryClientProvider>
  );
}

export const userEvent = event.setup();
export const screen = testScreen;

export function render(children: ReactElement) {
  return testRender(children, { wrapper: AllTheProviders });
}
