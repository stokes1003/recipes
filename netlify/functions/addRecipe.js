import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  try {
    const { title, category, img, ingredients, instructions } = JSON.parse(
      event.body
    );

    // Basic validation
    if (!title || !category || !ingredients?.length || !instructions?.length) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const { data, error } = await supabase
      .from("recipes")
      .insert([
        {
          title,
          category,
          img,
          ingredients,
          instructions,
        },
      ])
      .select(); // return inserted row(s)

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data[0]),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
