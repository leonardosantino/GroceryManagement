import { render } from "@/test/setup/render";

import InventoryPage from "@/app/inventory/page";

describe("InventoryPage", () => {
  it("should render inventory page", () => {
    const page = render(<InventoryPage />).baseElement;

    expect(page).toBeInTheDocument();
  });
});
