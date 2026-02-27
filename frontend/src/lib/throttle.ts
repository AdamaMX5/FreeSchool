// throttle.ts
export function throttle(fn: (...args: any[]) => void, delay: number) {
  let lastCall = 0;
  let timeoutId: any;
  let lastArgs: any;

  return (...args: any[]) => {
    const now = Date.now();
    lastArgs = args;

    // Leading call
    if (now - lastCall >= delay) {
      fn(...args);
      lastCall = now;
    }

    // Always clear old trailing timer
    clearTimeout(timeoutId);

    // Set trailing call
    timeoutId = setTimeout(() => {
      if (Date.now() - lastCall >= delay) {
        fn(...lastArgs);
        lastCall = Date.now();
      }
    }, delay);
  };
}
