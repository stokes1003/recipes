import { Card, Text, Image, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

type RecipeCardProps = {
  recipe: {
    id: number;
    title: string;
    category: string;
    img: string;
  };
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="lg"
      withBorder
      style={{
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(`/recipe/${recipe.id}`);
      }}
    >
      <Stack>
        <Card.Section>
          <Image src={recipe.img} w={352} h={200} />
        </Card.Section>

        <Stack gap={4} align="start">
          <Text fw={500} c="dimmed">
            {recipe.category}
          </Text>
          <Text fw={600} size="lg">
            {recipe.title}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}
