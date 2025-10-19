import { render } from "@/test/setup/render";

import ProductsEditPage from "@/app/products/edit/page";

describe("ProductsEditPage", () => {
  it("should render products edit page", async () => {
    const { findByTestId } = render(<ProductsEditPage />);

    const page = await findByTestId("products-edit-page");

    expect(page).toBeInTheDocument();
  });
});
