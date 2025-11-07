import { render } from "@/test/setup/render";

import SignInPage from "@/view/pages/SignIn";

describe("SignInPage", () => {
  it("should render signin page", async () => {
    const { findByTestId } = render(<SignInPage />);

    const page = await findByTestId("singin-page");

    expect(page).toBeInTheDocument();
  });
});
