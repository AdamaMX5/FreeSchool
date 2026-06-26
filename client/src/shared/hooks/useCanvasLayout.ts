// Scales a category background image to fit its container while preserving aspect
// ratio (object-fit: contain math), and exposes the transform needed to map a
// lesson's original-image pixel coordinates onto the scaled, centered image.
//
// The container is measured via ResizeObserver, so the layout reacts to window
// resizes *and* to the bottom toolbar appearing/disappearing (which shortens the
// container) without any hard-coded header/toolbar heights.
import { useEffect, useRef, useState, type RefObject, type SyntheticEvent } from "react";

export interface CanvasLayout {
  /** Attach to the canvas container; its content box is the available area. */
  containerRef: RefObject<HTMLDivElement>;
  /** Pass to the background <img> onLoad to capture its natural dimensions. */
  onImageLoad: (e: SyntheticEvent<HTMLImageElement>) => void;
  scale: number;
  /** Top-left of the scaled image within the container (centered). */
  offsetX: number;
  offsetY: number;
  scaledWidth: number;
  scaledHeight: number;
  /** Natural (original) image dimensions, 0 until the image has loaded. */
  naturalWidth: number;
  naturalHeight: number;
  /** True once both the container and the image natural size are known. */
  ready: boolean;
}

export function useCanvasLayout(): CanvasLayout {
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState({ w: 0, h: 0 });
  const [natural, setNatural] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setContainer({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
  }

  const fits = natural.w > 0 && natural.h > 0 && container.w > 0 && container.h > 0;
  const scale = fits ? Math.min(container.w / natural.w, container.h / natural.h) : 0;
  const scaledWidth = natural.w * scale;
  const scaledHeight = natural.h * scale;
  const offsetX = (container.w - scaledWidth) / 2;
  const offsetY = (container.h - scaledHeight) / 2;

  return {
    containerRef,
    onImageLoad,
    scale,
    offsetX,
    offsetY,
    scaledWidth,
    scaledHeight,
    naturalWidth: natural.w,
    naturalHeight: natural.h,
    ready: scale > 0,
  };
}
