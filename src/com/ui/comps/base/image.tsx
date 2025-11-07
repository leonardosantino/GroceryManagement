import Img from "next/image";

import { Box, BoxStyle } from "@/com/ui/comps/base/box";

type ImaProps = {
  src: string;
  width: number;
  alt: string;
} & BoxStyle;

export function Image(props: Readonly<ImaProps>) {
  return (
    <Box position={"relative"} {...props}>
      <Img
        src={props.src}
        alt={props.alt}
        sizes={props.width.toString()}
        fill
      />
    </Box>
  );
}
