'use client';

import useSWR, { SWRConfiguration } from 'swr';

// Shared fetcher function
export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      'cache-control': 'no-cache',
      'pragma': 'no-cache',
    },
  });
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.');
    error.status = res.status;
    throw error;
  }
  return res.json();
};

// Default SWR configuration
export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 5000, // Dedupe requests within 5 seconds
  focusThrottleInterval: 60000, // Throttle revalidation on focus to 1 minute
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  shouldRetryOnError: true,
  // Only revalidate when visible
  revalidateIfStale: true,
  // Keep previous data while revalidating
  keepPreviousData: true,
};

// Custom hook for services
export function useServices() {
  return useSWR('/api/services', fetcher, {
    ...swrConfig,
    refreshInterval: 0, // Disable polling, rely on manual revalidation
  });
}

// Custom hook for blogs
export function useBlogs() {
  return useSWR('/api/blogs', fetcher, {
    ...swrConfig,
    refreshInterval: 0, // Disable polling
  });
}

// Custom hook for images by section
type UseImagesOptions = {
  disableCache?: boolean;
};

export function useImages(section: string | null, options: UseImagesOptions = {}) {
  const { disableCache = false } = options;
  const queryKey = section
    ? `/api/images?section=${encodeURIComponent(section)}${disableCache ? "&noCache=1" : ""}`
    : null;

  return useSWR(
    queryKey,
    fetcher,
    {
      ...swrConfig,
      refreshInterval: 0,
      revalidateOnMount: true,
    }
  );
}




















