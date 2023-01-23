import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@planetscale/database';

const db = new Client({
  url: process.env['DATABASE_URL'] || 'mysql://jxxz4zs7ff22lkiy8yvw:pscale_pw_qGLr8dfVz2LRlLhegqDZO2OXDsa9nzWf552cIH4ovgP@eu-central.connect.psdb.cloud/wp_masennus?sslmode=require'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const conn = db.connection();
  const query = req.query;
  const { slug } = query;
  const pagesData = await 
    conn.execute(
      'SELECT ID, post_name AS "slug", post_title AS "title", post_content AS "content", post_date AS "posted", post_type, post_status FROM wp_posts WHERE (post_type = "page" AND post_status = "publish") AND post_name = ? ORDER BY ID ASC', [slug] 
    );

  const data = pagesData.rows;

  res.status(200).json(data);

};

export { };