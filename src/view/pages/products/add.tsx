import {
  Add,
  AddPhotoAlternate,
  Category,
  Delete,
  Inventory,
  Save,
} from "@mui/icons-material";
import { Button, Chip, Divider, IconButton, TextField } from "@mui/material";
import { createRef, RefObject, useRef, useState } from "react";

import { id } from "@/common/generate/id";
import { Box, Col, Form, Img, Paper, Row, Text } from "@/common/ui/comps";
import { Unit } from "@/model/product";
import {
  doubleFromCurrency,
  TextFieldCurrency,
} from "@/view/comps/input/currency";
import { InputFileUpload } from "@/view/comps/input/file";
import { ProductUnit } from "@/view/comps/products/unit";

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
    unitName: createRef<HTMLInputElement>(),
    unitDescription: createRef<HTMLInputElement>(),
    unitPrice: createRef<HTMLInputElement>(),
    unitQuantity: createRef<HTMLInputElement>(),
  }).current;
  const [error, setError] = useState({
    name: false,
    description: false,
    category: false,
    unitName: false,
    unitDescription: false,
    unitPrice: false,
    unitQuantity: false,
  });

  const [categories, setCategories] = useState(new Set<string>());
  const [images, setImages] = useState(new Set<string>());
  const [units, setUnits] = useState(new Set<Unit>());

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
      unitName: !refValidity(ref.unitName),
      unitDescription: !refValidity(ref.unitDescription),
      unitPrice: !refValidity(ref.unitPrice),
      unitQuantity: !refValidity(ref.unitQuantity),
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

  function handleSetUnit() {
    const validity = {
      unitName: !refValidity(ref.unitName),
      unitDescription: !refValidity(ref.unitDescription),
      unitPrice: !refValidity(ref.unitPrice),
      unitQuantity: !refValidity(ref.unitQuantity),
    };

    if (validity) {
      const unit = new Unit({
        id: id(),
        name: refValue(ref.unitName),
        description: refValue(ref.unitDescription),
        price: doubleFromCurrency(refValue(ref.unitPrice)),
        quantity: Number(refValue(ref.unitQuantity)),
      });

      units.add(unit);
      setUnits(new Set([...units]));
    }
    setError({ ...error, ...validity });
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
    <Row sx={{ height: "inherit", flexGrow: 1, justifyContent: "center" }}>
      <Form
        sx={{
          gap: 2,
          maxWidth: 900,
          height: "inherit",
          overflowY: "scroll",
          scrollbarWidth: "none",
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
              Adicione imagens de alta qualidade do seu produto. Recomendamos
              pelo menos 3 imagens de diferentes ângulos.
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
                  error={error.unitName}
                  inputRef={ref.unitName}
                />
                <TextField
                  required
                  placeholder="Descrição"
                  helperText={"Ex: 8 Fatias, 6 Fatias, 4 Fatias"}
                  error={error.unitDescription}
                  inputRef={ref.unitDescription}
                />
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  sx={{ height: 56 }}
                  onClick={handleSetUnit}
                >
                  Adicione
                </Button>
              </Row>

              <Row sx={{ gap: 2 }}>
                <TextFieldCurrency
                  required
                  inputRef={ref.unitPrice}
                  error={error.unitPrice}
                />
                <TextField
                  required
                  placeholder="Quantidade"
                  type={"number"}
                  error={error.unitQuantity}
                  inputRef={ref.unitQuantity}
                />
              </Row>
            </Col>

            <Divider />
            <Row sx={{ gap: 1 }}>
              {[0, 1, 2].map((e) => (
                <ProductUnit key={e} />
              ))}
            </Row>
          </Col>
        </Paper>

        {/*Save*/}
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
    </Row>
  );
}
