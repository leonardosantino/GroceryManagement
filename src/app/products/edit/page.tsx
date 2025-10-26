import { Row } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";

import { ProductsEdit } from "@/view/pages/products/edit";

export default function ProductsEditPage() {
  return (
    <Row height={"inherit"} wrap={"nowrap"}>
      <Sidebar />
      <ProductsEdit />
    </Row>
  );
}
