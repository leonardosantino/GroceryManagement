import { render } from "@/test/setup/render";

import OrdersPage from "@/app/orders/page";

describe("OrdersPage", () => {
  it("should render orders page", async () => {
    const { findByTestId } = render(<OrdersPage />);

    const page = await findByTestId("orders-page");

    expect(page).toBeInTheDocument();
  });
});
