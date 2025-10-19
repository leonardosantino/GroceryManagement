import { render } from "@/test/setup/render";

import ProductsAddPage from "@/app/products/add/page";

describe("ProductsAddPage", () => {
  it("should render products add page", () => {
    const page = render(<ProductsAddPage />).baseElement;

    expect(page).toBeInTheDocument();
  });
});
