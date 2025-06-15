import {
  Stack,
  Title,
  Text,
  Group,
  Input,
  FileInput,
  Button,
  Container,
} from "@mantine/core";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";
export function AddRecipe() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<string[]>(["", ""]);
  const [instructions, setInstructions] = useState<string[]>(["", ""]);
  const [selectedIngredient, setSelectedIngredient] = useState<number | null>(
    null
  );
  const [selectedInstruction, setSelectedInstruction] = useState<number | null>(
    null
  );
  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };
  const handleDeleteIngredient = (indexToDelete: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== indexToDelete);
    setIngredients(newIngredients);
    if (selectedIngredient === indexToDelete) {
      setSelectedIngredient(null);
    } else if (
      selectedIngredient !== null &&
      selectedIngredient > indexToDelete
    ) {
      setSelectedIngredient(selectedIngredient - 1);
    }
  };

  const handleDeleteInstruction = (indexToDelete: number) => {
    const newInstructions = instructions.filter((_, i) => i !== indexToDelete);
    setInstructions(newInstructions);
    if (selectedInstruction === indexToDelete) {
      setSelectedInstruction(null);
    } else if (
      selectedInstruction !== null &&
      selectedInstruction > indexToDelete
    ) {
      setSelectedInstruction(selectedInstruction - 1);
    }
  };
  const handleSubmit = () => {
    console.log("Submitting recipe:", {
      title,
      category,
      ingredients,
      instructions,
    });
  };
  return (
    <Container size="lg">
      <Stack align="center" my="xl" w="100%">
        <Stack align="center" gap="lg" w="100%">
          <Title order={2}>Add a Recipe</Title>

          <Stack gap="sm">
            <Text fw={600}>Title</Text>
            <Input
              placeholder="Recipe Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
          <Stack gap="sm">
            <Text fw={600}>Category</Text>
            <Input
              placeholder="Recipe Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Stack>

          <Group>
            <Text fw={600}>Image</Text>
            <FileInput
              placeholder="Upload Image"
              value={image}
              onChange={setImage}
            />
          </Group>
          <Stack gap="sm">
            <Text fw={600}>Ingredients</Text>
            <Stack gap="xs">
              {ingredients.map((ingredient, index) => (
                <Group key={index} align="center">
                  <Input
                    placeholder="Input ingredient"
                    value={ingredient}
                    onFocus={() => setSelectedIngredient(index)}
                    onBlur={() => setSelectedIngredient(null)}
                    style={{ cursor: "pointer" }}
                    onChange={(e) => {
                      const newIngredients = [...ingredients];
                      newIngredients[index] = e.target.value;
                      setIngredients(newIngredients);
                    }}
                  />
                  {selectedIngredient === index && (
                    <TiDelete
                      color="red"
                      style={{ cursor: "pointer" }}
                      onMouseDown={() => handleDeleteIngredient(index)}
                      size="24"
                    />
                  )}
                </Group>
              ))}

              <Text
                c="blue"
                style={{ cursor: "pointer" }}
                onClick={handleAddIngredient}
                size="sm"
              >
                Add Ingredient
              </Text>
            </Stack>
          </Stack>
          <Stack gap="sm">
            <Text fw={600}>Instructions</Text>
            <Stack gap="xs">
              {instructions.map((instruction, index) => (
                <Group key={index} align="center">
                  <Input
                    placeholder="Input Instructions"
                    value={instruction}
                    onFocus={() => setSelectedInstruction(index)}
                    onBlur={() => setSelectedInstruction(null)}
                    style={{ cursor: "pointer" }}
                    onChange={(e) => {
                      const newInstructions = [...instructions];
                      newInstructions[index] = e.target.value;
                      setInstructions(newInstructions);
                    }}
                  />
                  {selectedInstruction === index && (
                    <TiDelete
                      color="red"
                      style={{ cursor: "pointer" }}
                      onMouseDown={() => handleDeleteInstruction(index)}
                      size="24"
                    />
                  )}
                </Group>
              ))}
              <Text
                c="blue"
                style={{ cursor: "pointer" }}
                onClick={handleAddInstruction}
                size="sm"
              >
                Add Instruction
              </Text>
            </Stack>
          </Stack>

          <Button
            variant="filled"
            color="blue"
            size="md"
            onClick={handleSubmit}
          >
            Submit Recipe
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
