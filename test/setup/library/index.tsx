import "@testing-library/jest-dom";

import {
  render as testRender,
  screen as testScreen,
} from "@testing-library/react";
import { UserEvent, userEvent as event } from "@testing-library/user-event";
import { ReactNode } from "react";

import { RootLayoutProvider } from "@/com/provider/provider";
import { ViewStateProvider } from "@/state/view/provider";

export const userEvent: UserEvent = event.setup();
export const screen = testScreen;

export function render(ui: ReactNode) {
  return testRender(
    <RootLayoutProvider>
      <ViewStateProvider>{ui}</ViewStateProvider>
    </RootLayoutProvider>,
  );
}
