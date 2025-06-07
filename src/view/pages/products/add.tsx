import {
  Add,
  AddPhotoAlternate,
  Category,
  Delete,
  Inventory,
  Save,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { createRef, RefObject, useRef, useState } from "react";

import { Box, Col, Form, Img, Paper, Row, Text } from "@/common/ui/comps";
import { TextFieldCurrency } from "@/view/comps/input/currency";
import { InputFileUpload } from "@/view/comps/input/file";

type ErrorProps = {
  name: boolean;
  description: boolean;
  category: boolean;
};

export function ProductsAdd() {
  const ref = useRef({
    name: createRef<HTMLInputElement>(),
    description: createRef<HTMLInputElement>(),
    category: createRef<HTMLInputElement>(),
    image: createRef<HTMLInputElement>(),
  }).current;
  const [error, setError] = useState({
    name: false,
    description: false,
    category: false,
  });

  const [categories, setCategories] = useState(new Set<string>());
  const [images, setImages] = useState(new Set<string>());

  function handleFileUpload(files: FileList) {
    const image = URL.createObjectURL(files[0]);

    images.add(image);
    setImages(new Set([...images]));
  }

  function handleDeleteImage(img: string) {
    URL.revokeObjectURL(img);
    images.delete(img);
    setImages(new Set([...images]));
  }

  function onSave() {
    const err = getErrors();

    if (formValidity(err)) {
      console.log("FORM SAVED !");
    } else {
      console.log("NOT VALID !");
    }

    scroll(err);
    setError(err);
  }

  function getErrors() {
    return {
      name: !refValidity(ref.name),
      description: !refValidity(ref.description),
      category: categories.size < 1,
    };
  }

  function handleSetCategory() {
    const validity = refValidity(ref.category);

    if (validity) {
      const category = refValue(ref.category);
      categories.add(category);
      setCategories(new Set([...categories]));
    }
    setError({ ...error, category: !validity });
  }

  function onDeleteCategory(category: string) {
    categories.delete(category);
    setCategories(new Set([...categories]));
  }

  function scroll(err: ErrorProps) {
    if (err.name) refScroll(ref.name);
    else if (err.description) refScroll(ref.description);
    else if (err.category) refScroll(ref.category);
  }

  function refScroll(ref: RefObject<HTMLInputElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }

  function refValidity(ref: RefObject<HTMLInputElement | null>): boolean {
    return ref.current?.checkValidity() ?? false;
  }

  function refValue(ref: RefObject<HTMLInputElement | null>): string {
    return ref.current?.value as string;
  }

  function formValidity(err: ErrorProps) {
    return !Object.values(err).some((e) => e);
  }

  return (
    <Form
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
            error={error.name}
            inputRef={ref.name}
          />

          <TextField
            required
            placeholder="Descrição"
            multiline
            rows={4}
            error={error.description}
            inputRef={ref.description}
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
              error={error.category}
              inputRef={ref.category}
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

          <Row sx={{ gap: 1, minHeight: 32 }}>
            {[...categories].map((category, index) => (
              <Chip
                key={index}
                label={category}
                onDelete={() => onDeleteCategory(category)}
              />
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
                <InputFileUpload onChange={handleFileUpload} />
              </Col>
            </Box>
          </Row>

          <Divider />
          <Row
            sx={{
              justifyContent: "center",
              gap: 1,
              minHeight: 100,
            }}
          >
            {[...images].map((img) => (
              <Col key={img} sx={{ position: "relative" }}>
                <Img
                  src={img}
                  alt={img}
                  width={200}
                  height={100}
                  sx={{ width: 200, height: 100 }}
                />
                <IconButton
                  onClick={() => handleDeleteImage(img)}
                  sx={{ position: "absolute", right: 0 }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Col>
            ))}
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
    </Form>
  );
}
