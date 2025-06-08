import { Group, Stack, Title } from "@mantine/core";
import { RecipeCard } from "./RecipeCard";
import { useEffect, useState } from "react";

// const recipes = [
//   {
//     id: 1,
//     title: "Mom's Gumbo",
//     category: "Entree",
//     img: "/Gumbo.jpeg",
//     ingredients: [
//       "3/4 Jar of Roux",
//       "1 package of Andouille Sausage",
//       "1 package of smoked Sausage",
//       "16 chicken boullion cubes",
//       "1 large onion, diced",
//       "1 green bell pepper, diced",
//       "1 cut up whole Hen",
//       "2 celery stalks, diced",
//     ],
//     instructions: [
//       "Boil water in a stock pot and add the chicken boullion cubes.",
//       "Add the 3/4 jar of roux and stir until dissolved.",
//       "Add the vegetables and cook until soft.",
//       "Render sausage by adding enough water in a large pot to cover the bottom, then boil the sausage until the water is gone.",
//       "Fry the sausage until browned in the rendered fat.",
//       "Drain the sausage on paper towels and set aside.",
//       "Add drained sausage to the roux after the vegetables are soft.",
//       "Remove the skin from the cut up hen",
//       "Season hen with salt, black pepper, and cayenne pepper.",
//       "Add a small amount of oil to the sausage fat in the pot.",
//       "Brown the hen in the pot with the sausage fat.",
//       "Add 4-5 ladels of roux to the pressure cooker",
//       "Pressure cook the hen for 15 minutes",
//       "Debone the hen",
//       "Add water to the desired Roux color",
//       "Bring to a boil",
//       "Season to taste",
//       "Cook some rice",
//     ],
//   },
//   {
//     id: 2,
//     title: "Sam's Chocolate Chip Cookies",
//     category: "Dessert",
//     img: "/Cookies.jpeg",
//   },
//   {
//     id: 3,
//     title: "Triple Chocolate Brownies",
//     category: "Dessert",
//     img: "/Brownies.jpeg",
//   },
// ];

interface Recipe {
  id: number;
  title: string;
  category: string;
  img?: string;
  ingredients?: string[];
  instructions?: string[];
}

export function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("/.netlify/functions/getRecipes");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Stack align="center">
      <Title order={2}>My Recipes</Title>
      <Group gap="lg" justify="center" wrap="wrap">
        {recipes.map((item) => (
          <RecipeCard key={item.id} recipe={item} />
        ))}
      </Group>
    </Stack>
  );
}
