export const northStarData = [
  { date: 'Apr 01', revenue: 12000000, reach: 24000, mentions: 45, aiInsight: "Baseline performance at the start of the month. No major campaigns active." },
  { date: 'Apr 05', revenue: 14500000, reach: 26000, mentions: 50, aiInsight: "Slight uptick in weekend reservations. Standard organic traffic." },
  { date: 'Apr 10', revenue: 13000000, reach: 22000, mentions: 40, aiInsight: "Mid-week lull. Recommendation: Increase story frequency on Tuesdays/Wednesdays." },
  { date: 'Apr 14', revenue: 45000000, reach: 185000, mentions: 320, aiInsight: "✨ Massive 300% spike! This perfectly correlates with the 'Sunset Session' Instagram Reel going viral, driving high profile clicks and direct bookings." },
  { date: 'Apr 20', revenue: 28000000, reach: 85000, mentions: 150, aiInsight: "Sustained momentum from the Reel. Retargeting ads (Meta) are successfully converting visitors into table bookings." },
  { date: 'Apr 25', revenue: 32000000, reach: 92000, mentions: 180, aiInsight: "Payday weekend surge. High conversion rate on the Mari AI Concierge for VIP daybed inquiries." },
  { date: 'Apr 27', revenue: 35000000, reach: 110000, mentions: 210, aiInsight: "End of month summary generated. Content strategy shifting towards upcoming May events." },
];

export const platformBreakdown = [
  { name: 'Meta Ads', value: 45 },
  { name: 'Organic Instagram', value: 30 },
  { name: 'TikTok', value: 15 },
  { name: 'Google Search', value: 10 },
];

export const metaAdsCampaigns = [
  { id: '1', name: 'CONV_Mari_Table_Bookings_April', status: 'Active', spend: 8500000, cpc: 2500, conversions: 42, costPerConv: 202380, roas: 4.8 },
  { id: '2', name: 'RET_Website_Visitors_30D', status: 'Active', spend: 3200000, cpc: 1800, conversions: 28, costPerConv: 114285, roas: 7.2 },
  { id: '3', name: 'AWR_Sunset_Session_VideoView', status: 'Active', spend: 4500000, cpc: 850, conversions: 5, costPerConv: 900000, roas: 1.2 },
  { id: '4', name: 'CONV_Weekend_Brunch_Offer', status: 'Paused', spend: 2000000, cpc: 3100, conversions: 8, costPerConv: 250000, roas: 3.5 }
];

export const metaOrganicPosts = [
  { id: '1', title: 'Sunset Session Recap (Reel)', format: 'Reel', reach: 185000, interactions: 12400, profileVisits: 3200 },
  { id: '2', title: 'New VIP Daybed Aesthetic', format: 'Carousel', reach: 45000, interactions: 3100, profileVisits: 850 },
  { id: '3', title: 'Weekend DJ Lineup Announcement', format: 'Static', reach: 24000, interactions: 890, profileVisits: 120 },
];

export const ga4Kpis = {
  sessions: 42500,
  users: 38100,
  bounceRate: 42.5,
  avgSessionDuration: '02:45'
};

export const ga4TopPages = [
  { id: '1', path: '/', name: 'Homepage', views: 24000, avgTime: '01:20', trend: 'up' },
  { id: '2', path: '/vip-daybeds', name: 'VIP Daybeds', views: 8500, avgTime: '03:15', trend: 'up' },
  { id: '3', path: '/menu', name: 'Food & Drinks Menu', views: 5200, avgTime: '02:40', trend: 'neutral' },
  { id: '4', path: '/events', name: 'Special Promotions', views: 3100, avgTime: '01:50', trend: 'up' },
  { id: '5', path: '/gallery', name: 'Gallery', views: 1700, avgTime: '00:55', trend: 'down' }
];

export const ga4TrafficSources = [
  { name: 'Organic Search', users: 15200, color: '#3E1510' },
  { name: 'Direct', users: 11000, color: '#7A2B20' },
  { name: 'Social Referral', users: 8500, color: '#DDA77B' },
  { name: 'Paid Ads', users: 3400, color: '#A88C87' }
];

export const tiktokKpis = {
  videoViews: 1250000,
  engagementRate: 8.4,
  shares: 12400,
  followerGrowth: 2100
};

export const tiktokTopVideos = [
  { id: '1', title: 'POV: You booked a VIP Daybed at Mari', views: 540000, likes: 45000, shares: 8200, trend: 'viral' },
  { id: '2', title: 'Sunset Cocktails Behind the Scenes', views: 210000, likes: 18500, shares: 1500, trend: 'stable' },
  { id: '3', title: 'Weekend DJ Set Highlights', views: 185000, likes: 12000, shares: 850, trend: 'stable' },
  { id: '4', title: 'New Menu Tasting Reaction', views: 95000, likes: 6200, shares: 420, trend: 'new' }
];

export const tiktokAdsCampaigns = [
  { id: '1', name: 'Spark_Ads_VIP_Daybed', spend: 4500000, cpa: 125000, conversions: 36, roas: 3.2 },
  { id: '2', name: 'Traffic_Berawa_Tourists', spend: 2800000, cpa: 45000, conversions: 62, roas: 1.8 }
];

export const gadsKpis = {
  spend: 12400000,
  impressions: 450000,
  clicks: 12500,
  conversions: 85,
  avgCpc: 992
};

export const gadsCampaigns = [
  { id: '1', name: 'Search_Brand_MariBeachClub', type: 'Search', status: 'Active', spend: 3200000, conversions: 45, cpa: 71111, roas: 8.5 },
  { id: '2', name: 'Search_Generic_BeachClubBali', type: 'Search', status: 'Active', spend: 5500000, conversions: 22, cpa: 250000, roas: 2.1 },
  { id: '3', name: 'PMax_Bali_Tourists', type: 'Performance Max', status: 'Active', spend: 3700000, conversions: 18, cpa: 205555, roas: 1.8 }
];

export const gadsKeywords = [
  { id: '1', keyword: 'mari beach club', clicks: 4200, conversions: 38, cost: 850000 },
  { id: '2', keyword: 'best beach club in seminyak', clicks: 1800, conversions: 8, cost: 1200000 },
  { id: '3', keyword: 'bali beach clubs', clicks: 2100, conversions: 12, cost: 2100000 },
  { id: '4', keyword: 'beach club canggu', clicks: 950, conversions: 2, cost: 850000 },
];

export const gscKpis = {
  clicks: 34500,
  impressions: 890000,
  avgCtr: 3.87,
  avgPosition: 12.4
};

export const gscQueries = [
  { id: '1', query: 'mari beach club bali', clicks: 12400, impressions: 45000, ctr: 27.55, position: 1.2 },
  { id: '2', query: 'beach club batu belig', clicks: 3200, impressions: 18000, ctr: 17.77, position: 2.5 },
  { id: '3', query: 'mari beach club menu', clicks: 2100, impressions: 5400, ctr: 38.88, position: 1.1 },
  { id: '4', query: 'best sunset beach club bali', clicks: 1800, impressions: 32000, ctr: 5.62, position: 5.8 },
  { id: '5', query: 'bali daybeds', clicks: 850, impressions: 22000, ctr: 3.86, position: 8.4 },
];

export const youtubeKpis = {
  views: 85400,
  watchTime: 1240,
  subscribers: 320,
  avgViewDuration: '02:15'
};

export const youtubeVideos = [
  { id: '1', title: 'Sunset DJ Set - Live at Mari Beach Club', format: 'Long-form', views: 45000, watchTime: 950, engagement: 4.2 },
  { id: '2', title: 'The Ultimate Bali Daybed Experience', format: 'Shorts', views: 25000, watchTime: 120, engagement: 8.5 },
  { id: '3', title: 'Cocktail Masterclass: Tropical Sangria', format: 'Shorts', views: 12000, watchTime: 85, engagement: 6.1 },
  { id: '4', title: 'Mari Beach Club Full Walkthrough', format: 'Long-form', views: 3400, watchTime: 85, engagement: 3.8 }
];
