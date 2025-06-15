import { Group, Stack, Title } from "@mantine/core";
import { RecipeCard } from "./RecipeCard";
import { useEffect, useState } from "react";

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
