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
  /** Attach to the background <img> (in addition to onImageLoad) — lets the hook
   *  detect an image that finished loading from the browser cache before onLoad
   *  could be wired up (see the mount effect below). */
  imgRef: RefObject<HTMLImageElement>;
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

/**
 * @param resetKey Identifies the current background image (e.g. its src). CategoryCanvas
 *   is never remounted when navigating between categories, so without this the hook would
 *   keep reporting the *previous* category's natural size — and `ready` would stay true —
 *   until the new image's onLoad fires, which is exactly the stale-size window that made
 *   the position migration (issue #31) briefly persist wrong coordinates. Changing it
 *   drops back to "not ready" until the new image reports its own size.
 */
export function useCanvasLayout(resetKey?: string): CanvasLayout {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [container, setContainer] = useState({ w: 0, h: 0 });
  const [natural, setNatural] = useState({ w: 0, h: 0 });

  // The background image is often already in the browser cache — e.g. the same
  // URL was just shown as a CSS background-image thumbnail in the category menu
  // (CategorySidebar/HomeView) — so by the time this effect runs after the <img>'s
  // src was set, the image can already be fully loaded. A cached image may finish
  // loading synchronously, before React had a chance to attach the onLoad handler,
  // so the native "load" event never reaches it and the canvas would otherwise wait
  // forever. Checking img.complete here (on mount and whenever resetKey changes,
  // i.e. the background image changes) catches that case; onLoad still handles an
  // actual network load.
  useEffect(() => {
    setNatural({ w: 0, h: 0 });
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    }
  }, [resetKey]);

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
    imgRef,
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
