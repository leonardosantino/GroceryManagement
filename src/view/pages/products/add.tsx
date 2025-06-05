import {
  Add,
  AddPhotoAlternate,
  Category,
  Delete,
  Inventory,
  Save,
} from "@mui/icons-material";
import { Button, Chip, Divider, IconButton, TextField } from "@mui/material";
import { useRef, useState } from "react";

import { Box, Col, Img, Paper, Row, Text } from "@/common/ui/comps";
import { TextFieldCurrency } from "@/view/comps/input/currency";
import { InputFileUpload } from "@/view/comps/input/file";

export function ProductsAdd() {
  const nameRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState<boolean>(false);

  const descriptionRef = useRef<HTMLInputElement>(null);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  const categoryRef = useRef<HTMLInputElement>(null);
  const [categoryError, setCategoryError] = useState<boolean>(false);

  const [categories, setCategories] = useState<Set<string>>(new Set());

  function onSave() {
    const name = !nameRef.current?.checkValidity();

    if (name) {
      nameRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setNameError(name);

    const description = !descriptionRef.current?.checkValidity();

    if (description) {
      descriptionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setDescriptionError(description);

    const category = categories.size < 1;

    if (category) {
      categoryRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setCategoryError(category);
  }

  function handleSetCategory() {
    const validity = categoryRef.current?.checkValidity();

    if (validity) {
      const category = categoryRef.current?.value as string;

      setCategories(new Set([...categories].concat([category])));
    }
    setCategoryError(!validity);
  }

  return (
    <Col
      sx={{
        flexGrow: 1,
        paddingY: 7,
        gap: 2,
        paddingLeft: 3,
        overflow: "auto",
        scrollbarWidth: "none",
        maxWidth: 900,
      }}
    >
      {/*Basics*/}
      <Paper>
        <Col sx={{ padding: 2, gap: 2 }}>
          <Row sx={{ gap: 1 }}>
            <Inventory />
            <Text>Informações Básicas</Text>
          </Row>
          <Text variant="caption">Adicione nome e descrição do produto.</Text>

          <TextField
            required
            placeholder="Nome"
            error={nameError}
            inputRef={nameRef}
          />

          <TextField
            required
            placeholder="Descrição"
            multiline
            rows={4}
            error={descriptionError}
            inputRef={descriptionRef}
          />
        </Col>
      </Paper>

      {/*Category*/}
      <Paper>
        <Col sx={{ padding: 2, gap: 2 }}>
          <Row sx={{ gap: 1 }}>
            <Category />
            <Text>Categorias</Text>
          </Row>

          <Text variant="caption">
            Adicione categorias para ajudar os clientes a encontrarem seu
            produto mais facilmente.
          </Text>

          <Row sx={{ gap: 1 }}>
            <TextField
              required
              placeholder={"Categoria"}
              error={categoryError}
              inputRef={categoryRef}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleSetCategory}
            >
              Adicione
            </Button>
          </Row>

          <Divider />

          <Row sx={{ gap: 1 }}>
            {[...categories].map((category, index) => (
              <Chip key={index} label={category} onDelete={() => {}} />
            ))}
          </Row>
        </Col>
      </Paper>

      {/*Images*/}
      <Paper>
        <Col sx={{ padding: 2, gap: 2 }}>
          <Row sx={{ gap: 1 }}>
            <AddPhotoAlternate color="primary" />
            <Text>Imagens</Text>
          </Row>

          <Text variant="caption">
            Adicione imagens de alta qualidade do seu produto. Recomendamos pelo
            menos 3 imagens de diferentes ângulos.
          </Text>

          <Row sx={{ justifyContent: "center" }}>
            <Box
              sx={{
                width: 400,
                height: 200,
              }}
            >
              <Col
                sx={{
                  height: "inherit",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <AddPhotoAlternate color="primary" fontSize="large" />

                <InputFileUpload />
              </Col>
            </Box>
          </Row>

          <Divider />
          <Row sx={{ justifyContent: "center" }}>
            <Col sx={{ width: 100 }}>
              <Img
                src={"/assets/drawable/img.png"}
                alt={""}
                width={100}
                height={50}
              />
            </Col>
          </Row>
        </Col>
      </Paper>

      {/*Units*/}
      <Paper>
        <Col sx={{ padding: 2, gap: 3 }}>
          <Row sx={{ gap: 1 }}>
            <Inventory />
            <Text>Unidades</Text>
          </Row>

          <Text variant="caption">
            Adicione informações sobre as variações disponíveis do produto,
            preços e quantidades.
          </Text>

          <Col sx={{ gap: 1 }}>
            <Row sx={{ gap: 2 }}>
              <TextField
                required
                placeholder={"Nome"}
                helperText={"Ex: Grande, média, pequena."}
              />
              <TextField
                placeholder="Descrição"
                helperText={"Ex: 8 Fatias, 6 Fatias, 4 Fatias"}
              />
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ height: 56 }}
              >
                Adicione
              </Button>
            </Row>

            <Row sx={{ gap: 2 }}>
              <TextFieldCurrency />
              <TextField placeholder="Quantidade" type={"number"} />
            </Row>
          </Col>

          <Divider />
          <Box>
            <Row
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                paddingX: 1,
                paddingY: 2,
              }}
            >
              <Text variant={"body2"} sx={{ fontWeight: "bold" }}>
                Pizza de Calabresa
              </Text>

              <Text variant={"body2"}>Grande</Text>
              <Text variant={"body2"}>8 Fatias</Text>

              <Row
                sx={{
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Text>R$</Text>
                <Text sx={{ color: "success.main" }}>59,90</Text>
              </Row>

              <Row
                sx={{
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Text color={"warning"}>100</Text>
                <Text variant={"body2"}>Unidades</Text>
              </Row>

              <Col sx={{ justifyContent: "center" }}>
                <IconButton>
                  <Delete />
                </IconButton>
              </Col>
            </Row>
          </Box>
        </Col>
      </Paper>
      <Row sx={{ padding: 1, justifyContent: "center" }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<Save />}
          onClick={onSave}
          sx={{ height: 56, width: 200 }}
        >
          Salve
        </Button>
      </Row>
    </Col>
  );
}
