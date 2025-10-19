import { render } from "@/test/setup/render";

import AnalyticsPage from "@/app/page";

describe("AnalyticsPage", () => {
  it("should render analytics page", async () => {
    const { findByTestId } = render(<AnalyticsPage />);

    const page = await findByTestId("analytics-page");

    expect(page).toBeInTheDocument();
  });
});
