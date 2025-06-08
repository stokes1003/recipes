import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function handler(event) {
  try {
    // The recipe ID will come as a query string parameter: ?id=123
    const id = event.queryStringParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing recipe id" }),
      };
    }

    // Use tagged template syntax to safely query by ID
    const rows = await sql`SELECT * FROM "Recipes" WHERE id = ${id};`;

    if (rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Recipe not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(rows[0]),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
