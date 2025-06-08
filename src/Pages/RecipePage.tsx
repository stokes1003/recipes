import { Stack, Text, Image, List, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// const recipes = [
//   {
//     id: 1,
//     title: "Mom's Gumbo",
//     category: "Entree",
//     img: "/Gumbo.jpeg",
//     ingredients: [
//       "1 lb Andouille sausage, sliced",
//       "1 lb shrimp, peeled and deveined",
//       "1 cup okra, sliced",
//       "1 large onion, diced",
//       "1 green bell pepper, diced",
//       "2 celery stalks, diced",
//       "4 cloves garlic, minced",
//       "6 cups chicken broth",
//       "2 cups diced tomatoes",
//       "2 tablespoons Cajun seasoning",
//       "2 tablespoons vegetable oil",
//     ],
//     instructions: [
//       "In a large pot, heat vegetable oil over medium heat. Add sausage and cook until browned.",
//       "Add onion, bell pepper, celery, and garlic. Cook until vegetables are soft.",
//       "Stir in okra, diced tomatoes, Cajun seasoning, and chicken broth. Bring to a boil.",
//       "Reduce heat and simmer for 30 minutes.",
//       "Add shrimp and cook until pink and cooked through.",
//       "Serve hot with rice or crusty bread.",
//     ],
//   },
//   {
//     id: 2,
//     title: "Chocolate Chip Cookies",
//     category: "Dessert",
//     img: "/Cookies.jpeg",
//   },
//   {
//     id: 3,
//     title: "Tripple Chocolate Brownies",
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

export function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchRecipeById() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/.netlify/functions/getRecipeById?id=${id}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching recipe: ${response.statusText}`);
        }
        const data: Recipe = await response.json();
        setRecipe(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipeById();
  }, [id]);

  if (loading) return <Text mt="xl">Loading recipe...</Text>;
  if (error)
    return (
      <Text mt="xl" color="red">
        Error: {error}
      </Text>
    );
  if (!recipe) return <Text mt="xl">Recipe not found.</Text>;
  return (
    <Stack align="center" my="xl">
      <Image src={recipe?.img} alt={recipe?.title} w={576} h={432} />
      <Stack gap="lg" align="center" w="60%">
        <Title order={1}>{recipe?.title}</Title>
        <Text fw={500} c="dimmed">
          {recipe?.category}
        </Text>
        <Stack align="start" w="100%" gap="xl">
          <Stack>
            <Text fw={600} size="xl">
              Ingredients
            </Text>
            {recipe?.ingredients?.map((item, index) => {
              return (
                <Stack key={index} align="start">
                  <List>
                    <List.Item>{item}</List.Item>
                  </List>
                </Stack>
              );
            })}
          </Stack>
          <Stack gap="md">
            <Text fw={600} size="xl">
              Instructions
            </Text>
            {recipe?.instructions?.map((item, index) => {
              return (
                <Stack key={index} align="start" gap={4}>
                  <Text fw={600}>Step {index + 1}</Text>
                  <Text>{item}</Text>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
