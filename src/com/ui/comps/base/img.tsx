import Image from "next/image";

import { Box, BoxStyle } from "@/com/ui/comps/base/box";

type ImaProps = {
  src: string;
  alt: string;
} & BoxStyle;

export function Img(props: Readonly<ImaProps>) {
  return (
    <Box {...props}>
      <Image src={props.src} alt={props.alt} fill />
    </Box>
  );
}
