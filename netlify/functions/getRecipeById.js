import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  try {
    const id = event.queryStringParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing recipe id" }),
      };
    }

    const { data, error } = await supabase
      .from("recipes") // lowercase unless your table name is actually "Recipes"
      .select("*")
      .eq("id", id)
      .single(); // get one row or throw 404

    if (error) {
      if (error.code === "PGRST116") {
        // row not found
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Recipe not found" }),
        };
      }
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
