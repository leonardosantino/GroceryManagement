import { render } from "@/test/setup/render";

import InventoryPage from "@/app/inventory/page";

describe("InventoryPage", () => {
  it("should render inventory page", async () => {
    const { findByTestId } = render(<InventoryPage />);

    const page = await findByTestId("inventory-page");

    expect(page).toBeInTheDocument();
  });
});
