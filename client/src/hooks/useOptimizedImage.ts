import { useState, useEffect, useRef, useCallback } from 'react';

interface UseOptimizedImageOptions {
  src: string;
  placeholder?: string;
  priority?: boolean;
  blurDataUrl?: string;
}

interface UseOptimizedImageResult {
  src: string;
  isLoaded: boolean;
  ref: React.RefObject<HTMLImageElement | null>;
  style: React.CSSProperties;
}

// Cache for preloaded images
const imageCache = new Set<string>();
const loadingPromises = new Map<string, Promise<void>>();

// Preload an image and cache it
export function preloadImage(src: string): Promise<void> {
  if (imageCache.has(src)) return Promise.resolve();
  
  // Return existing promise if already loading
  if (loadingPromises.has(src)) {
    return loadingPromises.get(src)!;
  }
  
  const promise = new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.add(src);
      loadingPromises.delete(src);
      resolve();
    };
    img.onerror = () => {
      loadingPromises.delete(src);
      reject(new Error(`Failed to load image: ${src}`));
    };
    // Set fetchPriority for critical images
    (img as any).fetchPriority = 'high';
    img.src = src;
  });
  
  loadingPromises.set(src, promise);
  return promise;
}

// Preload multiple images with priority ordering
export function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage));
}

// Preload critical images immediately on page load
export function preloadCriticalImages(srcs: string[]): void {
  srcs.forEach(src => {
    if (!imageCache.has(src) && !loadingPromises.has(src)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.type = 'image/webp';
      (link as any).fetchPriority = 'high';
      document.head.appendChild(link);
      
      // Also start loading via Image object
      preloadImage(src);
    }
  });
}

// Default placeholder - a simple gray SVG
const DEFAULT_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=';

// Generate a blur placeholder SVG
export function generateBlurPlaceholder(color: string = '#e5e5e5'): string {
  return `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="${color}" width="100" height="100"/></svg>`)}`;
}

// Hook for optimized image loading with intersection observer
export function useOptimizedImage({ 
  src, 
  placeholder = DEFAULT_PLACEHOLDER,
  priority = false,
  blurDataUrl
}: UseOptimizedImageOptions): UseOptimizedImageResult {
  const [isLoaded, setIsLoaded] = useState(imageCache.has(src));
  const [currentSrc, setCurrentSrc] = useState(imageCache.has(src) ? src : (blurDataUrl || placeholder));
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imageCache.has(src)) {
      setCurrentSrc(src);
      setIsLoaded(true);
      return;
    }

    if (priority) {
      // Load immediately for priority images
      preloadImage(src).then(() => {
        setCurrentSrc(src);
        setIsLoaded(true);
      }).catch(console.error);
      return;
    }

    // Use intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preloadImage(src).then(() => {
              setCurrentSrc(src);
              setIsLoaded(true);
            }).catch(console.error);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '300px', // Start loading 300px before entering viewport
        threshold: 0.01
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [src, priority, placeholder, blurDataUrl]);

  // Style for smooth transition
  const style: React.CSSProperties = {
    transition: 'filter 0.3s ease-out, opacity 0.3s ease-out',
    filter: isLoaded ? 'blur(0)' : 'blur(10px)',
    opacity: isLoaded ? 1 : 0.8,
  };

  return { src: currentSrc, isLoaded, ref, style };
}

// Check if image is already cached
export function isImageCached(src: string): boolean {
  return imageCache.has(src);
}

// Preload video
export function preloadVideo(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.oncanplaythrough = () => resolve();
    video.onerror = () => reject(new Error(`Failed to load video: ${src}`));
    video.src = src;
    video.load();
  });
}

// Hook for video preloading
export function useOptimizedVideo(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsLoaded(true);
    
    video.addEventListener('canplaythrough', handleCanPlay);
    
    // If already ready
    if (video.readyState >= 3) {
      setIsLoaded(true);
    }

    return () => video.removeEventListener('canplaythrough', handleCanPlay);
  }, [src]);

  return { isLoaded, videoRef };
}
