import { useEffect, useState } from "react";

export function useImagesPreload(images: Record<string, { src: string }>) {
  const [preloaded, setPreloaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function preloadImages() {
      if (isCancelled) {
        return;
      }

      const promises: Array<Promise<any>> = [];

      const sources = Object.values(images).map((image) => image.src);

      for (const src of sources) {
        promises.push(preloadSingleImage(src));
      }

      let donePromises = 0;

      await Promise.all(
        promises.map((p) =>
          p.then(() => {
            donePromises++;
            setProgress(Math.round((donePromises / sources.length) * 100));
          })
        )
      );

      if (isCancelled) {
        return;
      }

      setPreloaded(true);
    }

    preloadImages();

    return () => {
      isCancelled = true;
    };
  }, [images]);

  return { preloaded, progress };
}

async function preloadSingleImage(src: string) {
  return new Promise(async (resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = (event) => reject(event);

    image.src = src;
  });
}
