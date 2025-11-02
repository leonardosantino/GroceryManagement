import { render } from "@/test/setup/render";

import ProductsEditPage from "@/app/products/edit/page";

import { ProductFixture } from "@/test/fixture/ProductFixture";
import { Api } from "@/clients/Api";

describe("ProductsEditPage", () => {
  it("should render products edit page", async () => {
    jest
      .spyOn(Api.products, "findById")
      .mockResolvedValue(ProductFixture.product8dc2);

    const { findByTestId } = render(<ProductsEditPage />);

    const page = await findByTestId("products-edit-page");

    expect(page).toBeInTheDocument();
  });
});
