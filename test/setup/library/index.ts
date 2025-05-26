import "@testing-library/jest-dom";

import { UserEvent, userEvent as event } from "@testing-library/user-event";

export { render, screen } from "@testing-library/react";

export const userEvent: UserEvent = event.setup();
