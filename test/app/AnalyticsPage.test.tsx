import { render } from "@/test/setup/render";

import AnalyticsPage from "@/app/page";

describe("AnalyticsPage", () => {
  it("should render analytics page", () => {
    const page = render(<AnalyticsPage />).baseElement;

    expect(page).toBeInTheDocument();
  });
});
