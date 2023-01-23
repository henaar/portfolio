import { Client } from '@planetscale/database';

export const config = {
  runtime: 'experimental-edge'
};

const db = new Client({
  url: process.env['DATABASE_URL'] || 'mysql://8caif7mhxkwfm97otehs:pscale_pw_YoPhBKFMlQdPy2iq363eXz77KKjfN5BOEMjdQFzCLef@us-east.connect.psdb.cloud/database?sslmode=require'
});

export default async function handler(req: Request) {
  const conn = db.connection();
  const pagesData= await
    conn.execute(
      'SELECT ID, post_name AS "slug", post_title AS "title", post_content AS "content", post_date AS "posted", post_type, post_status FROM wp_posts WHERE (post_type = "page" AND post_status = "publish") ORDER BY ID ASC'
    );

  const data = pagesData.rows;
  const json = JSON.stringify(data);

  return new Response(json, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'access-control-allow-origin': '*'
    }
  });
};

export { };