import { createPortal } from "react-dom";

interface IProps {
  loadingType?: string;
}

export default function Loading({ loadingType }: IProps) {
  return createPortal(
    <span
      className={`absolute top-[50%] left-[50%] loading ${loadingType} loading-lg`}
    ></span>,
    document.getElementById("loading") as HTMLSpanElement
  );
}
