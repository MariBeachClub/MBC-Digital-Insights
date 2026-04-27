const GAS_URL = 'https://script.google.com/macros/s/AKfycbzrEv2Dqx7dddfr5hqG9mlDgygiKt6C8sSsjajEcEzwRqZLesmGqC6nAYAx1ZjpV2G7-g/exec';

export const getWebAppUrl = async (): Promise<string> => {
  return GAS_URL;
};

export const saveWebAppUrl = async (url: string) => {
  // No-op for now to avoid breaking ConnectorsSetup
};

function formatSeconds(s: number): string {
  if (isNaN(s)) return '0m 0s';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}m ${sec}s`;
}

function formatNumber(n: number): string {
  if (isNaN(n)) return '0';
  if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n/1000).toFixed(1)}k`;
  return n.toString();
}

async function callBridge(platform: string, startDate?: string, endDate?: string) {
  let url = `${GAS_URL}?platform=${platform}`;
  if (startDate) url += `&startDate=${startDate}`;
  if (endDate) url += `&endDate=${endDate}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, { 
      method: 'GET', 
      redirect: 'follow',
      signal: controller.signal 
    });
    
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError(`Expected JSON, received ${contentType}`);
    }
    
    return await res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchPlatformData(
  platform: 'ga4' | 'gsc' | 'youtube' | 'meta' | 'tiktok' | 'email' | 'executive',
  startDate?: string,
  endDate?: string
) {
  const raw = await callBridge(platform, startDate, endDate);

  if (raw && raw.error) {
    throw new Error(raw.error);
  }

  if (platform === 'ga4') {
    if (!raw?.overview?.rows?.[0]?.metricValues) {
      console.warn("Malformed GA4 payload detected: Missing overview.rows[0].metricValues");
      return { kpis: [], timeSeries: [], sources: [], devices: [], topPages: [] };
    }
    const ov = raw.overview.rows[0].metricValues;
    const sessions = parseInt(ov[0]?.value || '0');
    const users = parseInt(ov[1]?.value || '0');
    const newUsers = parseInt(ov[2]?.value || '0');
    const pageViews = parseInt(ov[3]?.value || '0');
    const bounceRate = parseFloat(ov[4]?.value || '0');
    const avgSession = parseFloat(ov[5]?.value || '0');

    const topPages = (raw?.topPages?.rows || []).map((r: any) => ({
      pagePath: r.dimensionValues?.[0]?.value || '',
      views: parseInt(r.metricValues?.[0]?.value || '0'),
      users: 0,
      bounceRate: 'N/A'
    }));

    const sources = (raw?.trafficSources?.rows || []).slice(0, 6).map((r: any, i: number) => ({
      name: `${r.dimensionValues?.[0]?.value || 'direct'} / ${r.dimensionValues?.[1]?.value || 'none'}`,
      value: parseInt(r.metricValues?.[0]?.value || '0'),
      fill: ['#7A2B20','#DDA77B','#A88C87','#2E6B3B','#5C4541','#EAE3D9'][i] || '#EAE3D9'
    }));

    return {
      kpis: [
        { title: 'Total Users', value: formatNumber(users), change: 'Live', trend: 'neutral', iconName: 'users' },
        { title: 'Sessions', value: formatNumber(sessions), change: 'Live', trend: 'neutral', iconName: 'activity' },
        { title: 'Bounce Rate', value: `${(bounceRate * 100).toFixed(1)}%`, change: 'Live', trend: 'neutral', iconName: 'target' },
        { title: 'Avg Session', value: formatSeconds(avgSession), change: 'Live', trend: 'neutral', iconName: 'clock' }
      ],
      timeSeries: [],
      sources,
      devices: [],
      topPages
    };
  }

  if (platform === 'gsc') {
    if (!raw?.overview?.rows?.[0]) {
      console.warn("Malformed GSC payload detected: Missing overview.rows[0]");
      return { kpis: [], timeSeries: [], rankingDistribution: [], topQueries: [], brandData: [] };
    }
    const ov = raw.overview.rows[0];
    const queries = (raw?.queries?.rows || []).map((r: any) => ({
      query: r.keys?.[0] || r.query || '',
      clicks: r.clicks || 0,
      impressions: r.impressions || 0,
      ctr: ((r.ctr || 0) * 100).toFixed(2),
      position: parseFloat((r.position || 0).toFixed(1))
    }));

    return {
      kpis: [
        { id: 'impressions', title: 'Total Impressions', value: formatNumber(ov.impressions || 0), change: 'Live', trend: 'neutral', iconName: 'eye' },
        { id: 'clicks', title: 'Total Clicks', value: formatNumber(ov.clicks || 0), change: 'Live', trend: 'neutral', iconName: 'click' },
        { id: 'ctr', title: 'Average CTR', value: `${((ov.ctr || 0) * 100).toFixed(2)}%`, change: 'Live', trend: 'neutral', iconName: 'percent' },
        { id: 'position', title: 'Average Position', value: (ov.position || 0).toFixed(1), change: 'Live', trend: 'neutral', iconName: 'list' }
      ],
      timeSeries: [],
      rankingDistribution: [],
      topQueries: queries,
      brandData: []
    };
  }

  if (platform === 'youtube') {
    if (!raw?.overview?.rows?.[0]) {
      console.warn("Malformed YouTube payload detected: Missing overview.rows[0]");
      return { kpis: [], timeSeries: [], formatDistribution: [], trafficSources: [], topVideos: [] };
    }
    const ov = raw.overview.rows[0];
    return {
      kpis: [
        { title: 'Total Views', value: formatNumber(ov[0] || 0), change: 'Live', trend: 'neutral', iconName: 'eye' },
        { title: 'Watch Time (Hours)', value: formatNumber(Math.round((ov[1] || 0) / 60)), change: 'Live', trend: 'neutral', iconName: 'clock' },
        { title: 'Net Subscribers', value: `+${formatNumber(ov[3] || 0)}`, change: 'Live', trend: 'neutral', iconName: 'users' },
        { title: 'Avg. View Duration', value: formatSeconds(ov[2] || 0), change: 'Live', trend: 'neutral', iconName: 'timer' }
      ],
      timeSeries: [],
      formatDistribution: [],
      trafficSources: [],
      topVideos: []
    };
  }

  return raw;
}
