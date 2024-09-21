import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'google-auth-library';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed, use POST request' });
  }

  try {
    const authClient = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analytics = google.analytics('v3');

    const response = await analytics.data.ga.get({
      auth: authClient,
      ids: 'ga:' + process.env.GOOGLE_ANALYTICS_ID,
      'start-date': '30daysAgo',
      'end-date': 'today',
      metrics: 'ga:sessions,ga:pageviews',
      dimensions: 'ga:pagePath',
    });

    if (response.data) {
      console.log('API Response Data:', response.data); // Log response data for debugging
      return res.status(200).json(response.data);
    } else {
      console.error('No data returned from Google Analytics');
      return res.status(500).json({ error: 'No data returned from Google Analytics' });
    }
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error); // Log full error
    return res.status(500).json({ error: 'Error fetching Google Analytics data' });
  }
}
