import { render } from "@/test/setup/render";

import SettingsPage from "@/app/settings/page";

describe("SettingsPage", () => {
  it("should render settings page", async () => {
    const { findByTestId } = render(<SettingsPage />);

    const page = await findByTestId("products-list-page");

    expect(page).toBeInTheDocument();
  });
});
