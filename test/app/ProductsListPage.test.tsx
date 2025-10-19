import { render } from "@/test/setup/render";

import ProductsListPage from "@/app/products/list/page";

describe("ProductsListPage", () => {
  it("should render products list page", () => {
    const page = render(<ProductsListPage />).baseElement;

    expect(page).toBeInTheDocument();
  });
});
