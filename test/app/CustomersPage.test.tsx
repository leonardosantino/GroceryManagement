import { render } from "@/test/setup/render";

import CustomersPage from "@/app/customers/page";

describe("CustomersPage", () => {
  it("should render customers page", async () => {
    const { findByTestId } = render(<CustomersPage />);

    const page = await findByTestId("customers-page");

    expect(page).toBeInTheDocument();
  });
});
