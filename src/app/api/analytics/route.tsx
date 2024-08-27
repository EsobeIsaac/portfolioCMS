import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analytics = google.analyticsreporting({
      version: 'v4',
      auth,
    });

    const response = await analytics.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId: process.env.GOOGLE_ANALYTICS_ID,
            dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
            metrics: [{ expression: 'ga:sessions' }, { expression: 'ga:pageviews' }],
            dimensions: [{ name: 'ga:date' }],
          },
        ],
      },
    });

    const data = response.data.reports?.[0]?.data?.rows?.map((row) => {
      return {
        date: row.dimensions?.[0],
        sessions: row.metrics?.[0]?.values?.[0],
        pageviews: row.metrics?.[0]?.values?.[1],
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
  }
}
