import {
  Stack,
  Title,
  Text,
  Group,
  Input,
  FileInput,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { CiImageOn } from "react-icons/ci";

const clientId = import.meta.env.VITE_IMGUR_CLIENT_ID;
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
  const handleSubmit = async () => {
    try {
      const imgId = image ? await uploadToImgur(image) : null;
      const imgURL = imgId ? `https://i.imgur.com/${imgId}.jpg` : null;

      const newRecipe = {
        title: title.trim(),
        category: category.trim(),
        img: imgURL || undefined,
        ingredients: ingredients.filter((ing) => ing.trim() !== ""),
        instructions: instructions.filter((inst) => inst.trim() !== ""),
      };

      await addRecipe(newRecipe);

      console.log("Submitted Recipe:", newRecipe);
    } catch (err) {
      if (err instanceof Error && err.message.includes("rate limit")) {
        alert("Imgur is temporarily over capacity. Please try again later.");
      }
      console.error("Recipe submission failed:", err);
    } finally {
      console.log("Recipe added successfully:");

      setTitle("");
      setCategory("");
      setImage(null);
      setIngredients(["", ""]);
      setInstructions(["", ""]);
    }
  };

  const imageIcon = <CiImageOn />;

  const uploadToImgur = async (imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${clientId}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.data?.error ?? "Imgur upload failed");
      }

      return data.data.id;
    } catch (err) {
      console.error("Image upload failed:", err);
      throw err;
    }
  };

  const addRecipe = async (recipe: {
    title: string;
    category: string;
    img?: string;
    ingredients: string[];
    instructions: string[];
  }) => {
    try {
      const response = await fetch("/.netlify/functions/addRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        throw new Error(`Error adding recipe: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Recipe added successfully:", data);
    } catch (err) {
      console.error("Failed to add recipe:", err);
    }
  };

  return (
    <Stack align="center" my="xl" gap="lg">
      <Title order={2}>Add a Recipe</Title>
      <Stack align="start" gap="lg">
        <Stack gap="sm">
          <Text fw={600}>Title</Text>
          <Input
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            w={400}
          />
        </Stack>
        <Stack gap="sm">
          <Text fw={600}>Category</Text>
          <Input
            placeholder="Recipe Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            w={400}
          />
        </Stack>

        <Group>
          <Text fw={600}>Image</Text>
          <FileInput
            placeholder="Upload Image"
            value={image}
            onChange={setImage}
            rightSection={imageIcon}
            rightSectionPointerEvents="none"
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
                  w={400}
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
                  w={400}
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
      </Stack>

      <Button variant="filled" color="blue" size="md" onClick={handleSubmit}>
        Submit Recipe
      </Button>
    </Stack>
  );
}
