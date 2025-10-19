import { render } from "@/test/setup/render";

import ProductsAddPage from "@/app/products/add/page";

describe("ProductsAddPage", () => {
  it("should render products add page", async () => {
    const { findByTestId } = render(<ProductsAddPage />);

    const page = await findByTestId("products-add-page");

    expect(page).toBeInTheDocument();
  });
});
