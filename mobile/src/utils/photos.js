import { CacheManager } from 'react-native-expo-image-cache';

export const getPhotoUrl = id => `https://ucarecdn.com/${id}/`;

export async function onImageLoad() {
  const cacheSize = await CacheManager.getCacheSize();

  if (cacheSize > 10000) {
    CacheManager.clearCache();
  }
}
