import { render } from "@/test/setup/render";

import CustomersPage from "@/app/customers/page";

describe("CustomersPage", () => {
  it("should render customers page", () => {
    const page = render(<CustomersPage />).baseElement;

    expect(page).toBeInTheDocument();
  });
});
