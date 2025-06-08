import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function handler(event) {
  try {
    const rows = await sql`SELECT * FROM "Recipes";`; // ← Tagged template syntax
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
