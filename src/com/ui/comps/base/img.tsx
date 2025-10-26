import { Box, BoxProps } from "@/com/ui/comps/base/box";
import Image from "next/image";

type ImaProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
} & BoxProps;

export function Img(props: Readonly<ImaProps>) {
  return (
    <Box {...props}>
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
      />
    </Box>
  );
}
