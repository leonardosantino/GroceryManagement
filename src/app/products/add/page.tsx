import { Row } from "@/com/ui";
import { Sidebar } from "@/view/comps/bar/side";

import { ProductsAdd } from "@/view/pages/products/add";

export default function ProductsAddPage() {
  return (
    <Row height={"inherit"} wrap={"nowrap"}>
      <Sidebar />

      <ProductsAdd />
    </Row>
  );
}
