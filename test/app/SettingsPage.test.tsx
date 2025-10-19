import { render } from "@/test/setup/render";

import SettingsPage from "@/app/settings/page";

describe("SettingsPage", () => {
  it("should render settings page", () => {
    const page = render(<SettingsPage />).baseElement;

    expect(page).toBeInTheDocument();
  });
});
