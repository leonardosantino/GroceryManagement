import { render } from "@/test/setup/render";

import ProductsListPage from "@/app/products/list/page";

describe("ProductsListPage", () => {
  it("should render products list page", async () => {
    const { findByTestId } = render(<ProductsListPage />);

    const page = await findByTestId("products-list-page");

    expect(page).toBeInTheDocument();
  });
});
