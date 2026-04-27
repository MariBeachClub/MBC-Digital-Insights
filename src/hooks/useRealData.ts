import { useState, useEffect } from 'react';
import { fetchPlatformData } from '../utils/api';
import { useDateRange } from '../contexts/DateContext';
import { 
  GA4Data, GSCData, YouTubeData,
  GASGA4Response, GASGSCResponse, GASYouTubeResponse
} from '../types';

export function useGA4Data() {
  const [data, setData] = useState<GA4Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate } = useDateRange();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const json = await fetchPlatformData('ga4', startDate, endDate);
        
        let overview = {
          sessions: 0, users: 0, newUsers: 0, pageViews: 0, bounceRate: 0, avgSessionDuration: 0
        };
        
        // Grab numbers from the new formatted format
        if (json && json.kpis) {
           const getVal = (idx: number) => {
              const kpiNode = json?.kpis?.[idx];
              if (!kpiNode || typeof kpiNode.value !== 'string') return 0;
              const v = kpiNode.value.replace(/[^0-9.]/g, '');
              return parseFloat(v) || 0;
           };
           overview = {
             users: getVal(0),
             sessions: getVal(1),
             bounceRate: getVal(2),
             avgSessionDuration: 0,
             pageViews: 0,
             newUsers: 0
           };
        }

        setData({ overview, topPages: json?.topPages || [], trafficSources: json?.sources || [] });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('GA4 fetch error', { platform: 'ga4', startDate, endDate, error: errorMessage });
        setError(errorMessage);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => abortController.abort();
  }, [startDate, endDate]);

  return { overview: data?.overview, topPages: data?.topPages, trafficSources: data?.trafficSources, isLoading, error };
}

export function useGSCData() {
  const [data, setData] = useState<GSCData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate } = useDateRange();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const json = await fetchPlatformData('gsc', startDate, endDate);
        
        let overview = { clicks: 0, impressions: 0, ctr: 0, position: 0 };
        
        if (json && json.kpis) {
           const getVal = (idx: number) => {
              const kpiNode = json?.kpis?.[idx];
              if (!kpiNode || typeof kpiNode.value !== 'string') return 0;
              const v = kpiNode.value.replace(/[^0-9.]/g, '');
              let parsed = parseFloat(v);
              if (kpiNode.value.includes('k')) parsed *= 1000;
              if (kpiNode.value.includes('M')) parsed *= 1000000;
              return parsed || 0;
           };
           overview = {
               impressions: getVal(0),
               clicks: getVal(1),
               ctr: getVal(2),
               position: getVal(3)
           };
        }

        setData({ overview, topQueries: json?.topQueries || [] });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('GSC fetch error', { platform: 'gsc', startDate, endDate, error: errorMessage });
        setError(errorMessage);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => abortController.abort();
  }, [startDate, endDate]);

  return { overview: data?.overview, topQueries: data?.topQueries, isLoading, error };
}

export function useYouTubeData() {
  const [data, setData] = useState<YouTubeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate } = useDateRange();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const json = await fetchPlatformData('youtube', startDate, endDate);
        
        let overview = { views: 0, watchMinutes: 0, avgDuration: 0, subscribersGained: 0, subscribersLost: 0 };
        
        if (json && json.kpis) {
           const getVal = (idx: number) => {
              const kpiNode = json?.kpis?.[idx];
              if (!kpiNode || typeof kpiNode.value !== 'string') return 0;
              const v = kpiNode.value.replace(/[^0-9.]/g, '');
              let parsed = parseFloat(v);
              if (kpiNode.value.includes('k')) parsed *= 1000;
              if (kpiNode.value.includes('M')) parsed *= 1000000;
              return parsed || 0;
           };
           overview = {
               views: getVal(0),
               watchMinutes: getVal(1),
               subscribersGained: getVal(2),
               avgDuration: 0,
               subscribersLost: 0
           };
        }

        setData({ overview, topVideos: json?.topVideos || [] });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('YouTube fetch error', { platform: 'youtube', startDate, endDate, error: errorMessage });
        setError(errorMessage);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => abortController.abort();
  }, [startDate, endDate]);

  return { overview: data?.overview, topVideos: data?.topVideos, isLoading, error };
}
