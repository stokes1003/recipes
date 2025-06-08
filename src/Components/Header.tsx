import { Burger, Container, Group, Text, Box } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import classes from "../HeaderMenu.module.css";

const links = ["Add Recipe", "My Recipes"];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();

  const items = links.map((link) => (
    <a
      key={link}
      href="#"
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
        if (link === "My Recipes") {
          navigate("/"); // or whatever path you want
        } else if (link === "Add Recipe") {
          navigate("/add-recipe");
        }
        toggle(); // close menu on mobile
      }}
    >
      {link}
    </a>
  ));

  return (
    <header
      className={classes.header}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Container size="md">
        <Box className={classes.inner}>
          <Group align="center" justify="space-between" w="100%">
            <Box style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              <Text fw={800}>Recipes</Text>
            </Box>

            <Group gap={5} visibleFrom="sm">
              {items}
            </Group>

            {isMobile && (
              <>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  size="sm"
                  hiddenFrom="sm"
                />

                {opened && <Box className={classes.mobileMenu}>{items}</Box>}
              </>
            )}
          </Group>
        </Box>
      </Container>
    </header>
  );
}
