import useResize, { SizeType } from "../hooks/useResize";

export default function ResizableCard({
  text,
  initialSize,
}: {
  text: string;
  initialSize: SizeType;
}) {
  const onSizeChange = () => {};
  const {
    size,
    ref: handleRef,
    mouseDownHandlerTop,
    mouseDownHandlerBottom,
    mouseDownHandlerLeft,
    mouseDownHandlerRight,
  } = useResize<HTMLDivElement>({
    onSizeChange,
    initialSize,
  });

  return (
    <div
      className="drag-container"
      style={{ width: size.width, height: size.height }}
    >
      <h1>{text}</h1>
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
