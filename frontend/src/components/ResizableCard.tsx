import { useContext } from "react";
import { BoxDataType, CardConfigType, SharedSizeContext } from "../App";
import useResize, { SizeType } from "../hooks/useResize";

export default function ResizableCard({
  id,
  className,
  text,
  cardConfig,
}: {
  className?: string;
  id: keyof CardConfigType;
  text: string;
  cardConfig: BoxDataType;
}) {
  const { updateCardSize } = useContext(SharedSizeContext);
  const onSizeChange = (size: SizeType) => {
    updateCardSize(id, size);
  };
  const {
    size,
    ref: handleRef,
    mouseDownHandlerTop,
    mouseDownHandlerBottom,
    mouseDownHandlerLeft,
    mouseDownHandlerRight,
  } = useResize<HTMLDivElement>({
    onSizeChange,
    initialSize: cardConfig.size,
  });

  return (
    <div
      className={`${className} resizable_card`}
      id={`${id}`}
      style={{ width: size.width, height: size.height, ...cardConfig.styles }}
    >
      <div className="resizable_card_inner">
        <p>{text}</p>
      </div>
      <div
        className="dragHandle"
        id="top"
        ref={handleRef}
        onMouseDown={mouseDownHandlerTop}
      />
      <div
        className="dragHandle"
        id="bottom"
        ref={handleRef}
        onMouseDown={mouseDownHandlerBottom}
      />
      <div
        className="dragHandle"
        id="left"
        ref={handleRef}
        onMouseDown={mouseDownHandlerLeft}
      />
      <div
        className="dragHandle"
        id="right"
        ref={handleRef}
        onMouseDown={mouseDownHandlerRight}
      />
    </div>
  );
}
