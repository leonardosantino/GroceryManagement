import { Box as Bx, BoxProps } from "@mui/material";
import Image from "next/image";

type ImaProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
} & BoxProps;

export function Img(props: Readonly<ImaProps>) {
  return (
    <Bx {...props}>
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
      />
    </Bx>
  );
}
