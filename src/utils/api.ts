import { ga4Kpis, ga4TopPages, ga4TrafficSources, gscKpis, gscQueries, youtubeKpis, youtubeVideos } from './mockData';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const DEFAULT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzz2UV_EPrpFUKlxIyQ71KaVlKihSxXrgAOPbnGPLhn__0LPDier3lEH4z0KoAtiqLnog/exec';

export const getWebAppUrl = async (): Promise<string> => {
  if (!auth.currentUser) return DEFAULT_WEB_APP_URL;
  try {
    const docRef = doc(db, 'user_settings', auth.currentUser.uid);
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data().webAppUrl) {
      return snap.data().webAppUrl;
    }
  } catch (error) {
    console.error("Error fetching web app URL:", error);
  }
  return DEFAULT_WEB_APP_URL;
};

export const saveWebAppUrl = async (url: string) => {
  if (!auth.currentUser) throw new Error("User must be logged in to save settings.");
  const docRef = doc(db, 'user_settings', auth.currentUser.uid);
  await setDoc(docRef, { 
    webAppUrl: url, 
    updatedAt: serverTimestamp() 
  }, { merge: true });
};

// Utility formatters
const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const getTrend = (current: number, threshold: number = 0) => {
  // If we had historical data we would compare. For now, pseudo-random or default to trend='up'
  return 'up';
};

export const fetchGA4Data = async () => {
  try {
    const url = await getWebAppUrl();
    const res = await fetch(`${url}?platform=ga4`);
    if (!res.ok) throw new Error('Failed to fetch GA4 data');
    const data = await res.json();
    
    if (data.overview && data.overview.rows && data.overview.rows.length > 0) {
      const row = data.overview.rows[0].metricValues;
      const kpis = {
        sessions: parseInt(row[0].value),
        users: parseInt(row[1].value), // activeUsers
        newUsers: parseInt(row[2].value), // newUsers
        pageviews: parseInt(row[3].value), // screenPageViews
        bounceRate: (parseFloat(row[4].value) * 100).toFixed(1), // bounceRate
        avgSessionDuration: formatTime(parseFloat(row[5].value)), // averageSessionDuration
      };
      
      const topPages = (data.topPages?.rows || []).map((r: any, i: number) => ({
        id: String(i + 1),
        path: r.dimensionValues[0].value,
        name: r.dimensionValues[0].value, // Usually we don't have title, so use path
        views: parseInt(r.metricValues[0].value),
        avgTime: '00:00', // Didn't request time in this report
        trend: 'neutral'
      }));

      const colors = ['#3E1510', '#7A2B20', '#DDA77B', '#A88C87', '#EAE3D9'];
      const sources = (data.sessionsBySource?.rows || []).slice(0, 5).map((r: any, i: number) => ({
        name: r.dimensionValues[0].value,
        users: parseInt(r.metricValues[0].value),
        color: colors[i % colors.length]
      }));

      return { kpis, topPages, sources };
    } else if (data.overview?.error) {
      console.warn("GA4 API Error (scopes or setup):", data.overview.error.message);
    }
  } catch (error) {
    console.error("Network or parsing error fetching GA4:", error);
  }
  
  // Return fallback if errors out or hasn't got rows
  return {
    kpis: ga4Kpis,
    topPages: ga4TopPages,
    sources: ga4TrafficSources
  };
};

export const fetchGSCData = async () => {
  try {
    const url = await getWebAppUrl();
    const res = await fetch(`${url}?platform=gsc`);
    if (!res.ok) throw new Error('Failed to fetch GSC data');
    const data = await res.json();

    if (data.totals && data.totals.rows && data.totals.rows.length > 0) {
       const row = data.totals.rows[0];
       const kpis = {
         clicks: row.clicks,
         impressions: row.impressions,
         avgCtr: (row.ctr * 100).toFixed(2),
         avgPosition: row.position.toFixed(1)
       };

       const queries = (data.topQueries?.rows || []).map((r: any, i: number) => ({
         id: String(i + 1),
         query: r.keys[0],
         clicks: r.clicks,
         impressions: r.impressions,
         ctr: (r.ctr * 100).toFixed(2),
         position: r.position.toFixed(1)
       }));

       return { kpis, queries };
    } else if (data.totals?.error) {
      console.warn("GSC API Error:", data.totals.error.message);
    }
  } catch (error) {
    console.error("Network error fetching GSC:", error);
  }

  return {
    kpis: gscKpis,
    queries: gscQueries
  };
};

export const fetchYoutubeData = async () => {
  try {
    const url = await getWebAppUrl();
    const res = await fetch(`${url}?platform=youtube`);
    if (!res.ok) throw new Error('Failed to fetch YouTube data');
    const data = await res.json();

    if (data.analytics && data.analytics.rows && data.analytics.rows.length > 0) {
        // analytics cols: views,estimatedMinutesWatched,averageViewDuration,subscribersGained,subscribersLost
        const row = data.analytics.rows[0];
        const kpis = {
           views: row[0],
           watchTime: row[1],
           avgViewDuration: formatTime(row[2]),
           subscribers: row[3] - row[4] // net subscribers
        };

        const videos = (data.topVideos?.items || []).map((item: any) => ({
           id: item.id.videoId,
           title: item.snippet.title,
           views: 0, // YouTube Data API snippet doesn't return views in search, need videos endpoint for views
           likes: 0,
           comments: 0
        }));

        return { kpis, videos };
    } else if (data.analytics?.error) {
       console.warn("YouTube API Error:", data.analytics.error.message);
    }
  } catch (error) {
    console.error("Network error fetching YouTube:", error);
  }

  return {
    kpis: youtubeKpis,
    videos: youtubeVideos
  };
};
