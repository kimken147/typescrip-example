export default function (func: (...rest: any[]) => void, limit: number) {
  let lastFunc: NodeJS.Timeout | undefined;
  let lastRan: number;
  return function () {
    const context = window;
    const args = [...arguments];
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc as NodeJS.Timeout)
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

