import { Group, Stack, Title } from "@mantine/core";
import { RecipeCard } from "./RecipeCard";

const recipes = [
  {
    id: 1,
    title: "Mom's Gumbo",
    category: "Entree",
    img: "/Gumbo.jpeg",
    ingredients: [
      "1 lb Andouille sausage, sliced",
      "1 lb shrimp, peeled and deveined",
      "1 cup okra, sliced",
      "1 large onion, diced",
      "1 green bell pepper, diced",
      "2 celery stalks, diced",
      "4 cloves garlic, minced",
      "6 cups chicken broth",
      "2 cups diced tomatoes",
      "2 tablespoons Cajun seasoning",
      "2 tablespoons vegetable oil",
    ],
    instructions: [
      "In a large pot, heat vegetable oil over medium heat. Add sausage and cook until browned.",
      "Add onion, bell pepper, celery, and garlic. Cook until vegetables are soft.",
      "Stir in okra, diced tomatoes, Cajun seasoning, and chicken broth. Bring to a boil.",
      "Reduce heat and simmer for 30 minutes.",
      "Add shrimp and cook until pink and cooked through.",
      "Serve hot with rice or crusty bread.",
    ],
  },
  {
    id: 2,
    title: "Chocolate Chip Cookies",
    category: "Dessert",
    img: "/Cookies.jpeg",
  },
  {
    id: 3,
    title: "Tripple Chocolate Brownies",
    category: "Dessert",
    img: "/Brownies.jpeg",
  },
];
export function Recipes() {
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
