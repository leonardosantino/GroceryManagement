import { render } from "@/test/setup/render";

import ProductsEditPage from "@/app/products/edit/page";

describe("ProductsEditPage", () => {
  it("should render products edit page", () => {
    const page = render(<ProductsEditPage />).baseElement;

    expect(page).toBeInTheDocument();
  });
});
