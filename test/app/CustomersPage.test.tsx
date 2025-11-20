import { render } from "@/test/setup/render";

import CustomersPage from "@/app/customers/list/page";

describe("CustomersPage", () => {
  it("should render customers page", async () => {
    const { findByTestId } = render(<CustomersPage />);

    const page = await findByTestId("customers-list-page");

    expect(page).toBeInTheDocument();
  });
});
