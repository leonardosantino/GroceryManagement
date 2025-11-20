import { render } from "@/test/setup/render";

import OrdersPage from "@/app/orders/list/page";

describe("OrdersPage", () => {
  it("should render orders page", async () => {
    const { findByTestId } = render(<OrdersPage />);

    const page = await findByTestId("orders-list-page");

    expect(page).toBeInTheDocument();
  });
});
