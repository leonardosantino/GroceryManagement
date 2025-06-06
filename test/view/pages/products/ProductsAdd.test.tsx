import { render } from "@/test/setup/library";
import { ProductsAdd } from "@/view/pages/products/add";

describe("ProductsAdd", () => {
  it("should render products add", () => {
    const page = render(<ProductsAdd />).baseElement;

    expect(page).toBeInTheDocument();
  });
});
