import { render } from "@/test/setup/render";

import OrdersPage from "@/app/orders/page";

describe("OrdersPage", () => {
  it("should render orders page", () => {
    const page = render(<OrdersPage />).baseElement;

    expect(page).toBeInTheDocument();
  });
});
