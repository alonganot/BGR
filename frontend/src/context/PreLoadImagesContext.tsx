import { useState, useEffect, createContext, ReactNode, useContext } from 'react';
import { useQuery } from 'react-query';
import { api } from '../../data/api';

interface iPreLoadImagesContext {
    loadedImages: string[]
}

const PreloadImagesContext = createContext<iPreLoadImagesContext | null>(null);

export const usePreloadedImages = () => useContext(PreloadImagesContext) as iPreLoadImagesContext

export const PreloadImagesProvider = ({children}:{ children: ReactNode}) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  
  const { data } = useQuery('getAllQuestions', () => api().questions().getAll());
  const imageUrls = data? data.flatMap(question => question.options).map(option => option.url): [];

  useEffect(() => {
    const loadImages = async () => {
      const promises = imageUrls.map((url) => {
        return new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(url);
          img.onerror = reject;
        });
      });

      try {
        const results = await Promise.all(promises);
        setLoadedImages(results);
      } catch (error) {
        console.error('Failed to preload images', error);
      }
    };

    loadImages();
  }, [imageUrls]);

  return (
    <PreloadImagesContext.Provider value={{loadedImages}}>
      {children}
    </PreloadImagesContext.Provider>
  );
};