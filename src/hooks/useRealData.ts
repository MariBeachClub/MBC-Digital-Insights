import { useState, useEffect } from 'react';
import { getWebAppUrl } from '../utils/api';
import { useDateRange } from '../contexts/DateContext';

export function useGA4Data() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate } = useDateRange();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const url = await getWebAppUrl();
        const res = await fetch(`${url}?platform=ga4&startDate=${startDate}&endDate=${endDate}`);
        if (!res.ok) throw new Error('Failed to fetch GA4 data');
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        
        let overview = {
          sessions: 0, users: 0, newUsers: 0, pageViews: 0, bounceRate: 0, avgSessionDuration: 0
        };
        if (json.overview?.rows?.[0]?.metricValues) {
          const m = json.overview.rows[0].metricValues;
          overview = {
            sessions: parseInt(m[0].value) || 0,
            users: parseInt(m[1].value) || 0,
            newUsers: parseInt(m[2].value) || 0,
            pageViews: parseInt(m[3].value) || 0,
            bounceRate: parseFloat(m[4].value) || 0,
            avgSessionDuration: parseFloat(m[5].value) || 0
          };
        }

        let topPages = [];
        if (json.topPages?.rows) {
          topPages = json.topPages.rows.map((r: any) => ({
            path: r.dimensionValues[0].value,
            views: parseInt(r.metricValues[0].value) || 0
          }));
        }

        let trafficSources = [];
        if (json.trafficSources?.rows) {
          trafficSources = json.trafficSources.rows.map((r: any) => ({
            source: r.dimensionValues[0].value,
            medium: r.dimensionValues[1].value,
            sessions: parseInt(r.metricValues[0].value) || 0
          }));
        }

        setData({ overview, topPages, trafficSources });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [startDate, endDate]);

  return { ...data, isLoading, error };
}

export function useGSCData() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate } = useDateRange();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const url = await getWebAppUrl();
        const res = await fetch(`${url}?platform=gsc&startDate=${startDate}&endDate=${endDate}`);
        if (!res.ok) throw new Error('Failed to fetch GSC data');
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        
        let overview = { clicks: 0, impressions: 0, ctr: 0, position: 0 };
        if (json.overview?.rows?.[0]) {
            overview = {
                clicks: json.overview.rows[0].clicks || 0,
                impressions: json.overview.rows[0].impressions || 0,
                ctr: json.overview.rows[0].ctr || 0,
                position: json.overview.rows[0].position || 0
            };
        }

        let topQueries = [];
        if (json.queries?.rows) {
            topQueries = json.queries.rows.map((r: any) => ({
                query: r.keys[0],
                clicks: r.clicks,
                impressions: r.impressions,
                ctr: r.ctr,
                position: r.position
            }));
        }

        setData({ overview, topQueries });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [startDate, endDate]);

  return { ...data, isLoading, error };
}

export function useYouTubeData() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate } = useDateRange();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const url = await getWebAppUrl();
        const res = await fetch(`${url}?platform=youtube&startDate=${startDate}&endDate=${endDate}`);
        if (!res.ok) throw new Error('Failed to fetch YouTube data');
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        
        // Match standard youtube api response
        let overview = { views: 0, watchMinutes: 0, avgDuration: 0, subscribersGained: 0, subscribersLost: 0 };
        if (json.overview?.rows?.[0]) {
          const r = json.overview.rows[0];
          overview = {
            views: r[0] || 0,
            watchMinutes: r[4] || 0, // estimatedMinutesWatched
            avgDuration: r[5] || 0, // averageViewDuration
            subscribersGained: 0, // not in the new script
            subscribersLost: 0    // not in the new script
          }
        }

        let topVideos = [];
        if (json.topVideos?.rows) {
          topVideos = json.topVideos.rows.map((r: any) => ({
            videoId: r[0],
            views: r[1],
            likes: r[2],
            shares: r[3]
          }));
        }

        setData({ overview, topVideos });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [startDate, endDate]);

  return { ...data, isLoading, error };
}
