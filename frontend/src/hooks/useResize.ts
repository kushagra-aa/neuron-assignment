import { MouseEvent as ME, useEffect, useRef, useState } from "react";

export type SizeType = {
  width: number;
  height: number;
};

export default function useResize<ElementType>({
  onSizeChange,
  minSize,
  initialSize,
}: {
  initialSize: SizeType;
  onSizeChange?: (size: SizeType) => void;
  minSize?: number;
}) {
  const ref = useRef<ElementType>(null!);
  const [size, setSize] = useState<SizeType>({
    width: initialSize.width,
    height: initialSize.height,
  });
  const minimumSize = minSize && minSize >= 0 ? minSize : 50;

  // Calculate new size(Height or Width) based on initial position(mouseDownY), distance moved(pageY), and current size(currSize)
  // Then Validate it to pass the constraints, ie: minimum and maximum size
  const calculateNCheckSize = (
    currSize: number,
    pageSize: number,
    mouseDownSize: number,
    windowSize: number
  ) => {
    const calculatedWidth = currSize - mouseDownSize + pageSize;

    if (calculatedWidth < minimumSize) return minimumSize;
    if (calculatedWidth > windowSize * 0.9) return windowSize * 0.9;
    return calculatedWidth;
  };

  const mouseDownHandlerInner = (
    calculateFunction: (event: MouseEvent) => void
  ) => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return; // Check if element exists before accessing

      calculateFunction(event);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };

    if (ref.current) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp, { once: true });
    }
  };

  const mouseDownHandlerBottom = (mouseDownEvent: ME<ElementType>) => {
    const calculateFunction = (event: MouseEvent) => {
      setSize((s) => ({
        height: calculateNCheckSize(
          s.height,
          event.pageY,
          mouseDownEvent.pageY,
          window.innerHeight
        ),
        width: s.width,
      }));
    };
    mouseDownHandlerInner(calculateFunction);
  };
  const mouseDownHandlerTop = (mouseDownEvent: ME<ElementType>) => {
    const calculateFunction = (event: MouseEvent) => {
      setSize((s) => ({
        height: calculateNCheckSize(
          s.height,
          mouseDownEvent.pageY,
          event.pageY,
          window.innerHeight
        ),
        width: s.width,
      }));
    };
    mouseDownHandlerInner(calculateFunction);
  };
  const mouseDownHandlerRight = (mouseDownEvent: ME<ElementType>) => {
    const calculateFunction = (event: MouseEvent) => {
      setSize((s) => ({
        width: calculateNCheckSize(
          s.width,
          event.pageX,
          mouseDownEvent.pageX,
          window.innerHeight
        ),
        height: s.height,
      }));
    };
    mouseDownHandlerInner(calculateFunction);
  };
  const mouseDownHandlerLeft = (mouseDownEvent: ME<ElementType>) => {
    const calculateFunction = (event: MouseEvent) => {
      setSize((s) => ({
        width: calculateNCheckSize(
          s.width,
          mouseDownEvent.pageX,
          event.pageX,
          window.innerHeight
        ),
        height: s.height,
      }));
    };
    mouseDownHandlerInner(calculateFunction);
  };

  useEffect(() => {
    if (onSizeChange) onSizeChange(size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return {
    size,
    ref,
    mouseDownHandlerTop,
    mouseDownHandlerBottom,
    mouseDownHandlerLeft,
    mouseDownHandlerRight,
  };
}
