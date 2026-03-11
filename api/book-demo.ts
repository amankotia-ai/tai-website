import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, workEmail, company, phone, role, primaryGoal, date, time } = req.body;

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: {
            title: [{ text: { content: `${firstName} ${lastName}` } }],
          },
          Email: {
            email: workEmail,
          },
          Company: {
            rich_text: [{ text: { content: company } }],
          },
          Phone: {
            phone_number: phone || null,
          },
          Role: {
            select: { name: role },
          },
          'Primary Goal': {
            select: { name: primaryGoal },
          },
          ...(date && {
            'Demo Date': { date: { start: date } },
          }),
          ...(time && {
            'Demo Time': { rich_text: [{ text: { content: time } }] },
          }),
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Notion API error:', error);
      return res.status(500).json({ error: 'Failed to save booking' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('book-demo handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
