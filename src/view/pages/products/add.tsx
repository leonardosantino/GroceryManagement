"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { MarketApi } from "@/api/market";
import { Conditional } from "@/com/conditional/conditional";
import {
  Add,
  AddPhotoAlternate,
  Alert,
  Button,
  Chip,
  Col,
  Deco,
  Delete,
  Divider,
  Form,
  IconButton,
  Img,
  Input,
  InputFile,
  Inventory,
  Paper,
  Row,
  SaveRounded,
  ScrollCol,
  Text,
  InputAdornment,
} from "@/com/ui";

import { useProductFormRef } from "@/hooks/form/product";
import { Product } from "@/model/product";
import {
  getProductFormIssues,
  ProductFormErrors,
  ProductSchema,
  refScroll,
  refValue,
  ZodIssue,
} from "@/model/schema/product";
import { fontSize } from "@/com/ui/style/scheme";
import { isNullOrEmpty } from "@/com/validation";
import { Snackbar } from "@mui/material";

const api = new MarketApi();

export function ProductsAdd() {
  const productRef = useProductFormRef();

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState(new Set<string>());
  const [images, setImages] = useState(new Set<string>());

  const [errors, setErrors] = useState<ProductFormErrors>({});

  async function onSave(e: FormEvent) {
    e.preventDefault();

    const productForm: Product = {
      name: refValue(productRef.name),
      description: refValue(productRef.description),
      categories: [...categories],
      images: [...images],
      unit: {
        name: refValue(productRef.unit.name),
        description: refValue(productRef.unit.description),
        price: Number(refValue(productRef.unit.price)),
        quantity: Number(refValue(productRef.unit.quantity)),
      },
    };

    const form = ProductSchema.safeParse(productForm);
    const issues = form.error?.issues as ZodIssue[];

    if (form.success) {
      setIsLoading(true);

      await api.productSave(productForm);

      setIsLoading(false);
      setIsSaved(true);

      setCategories(new Set([]));
      setImages(new Set([]));
      setErrors({});

      (e.target as HTMLFormElement).reset();
    } else {
      const productFormErrors: ProductFormErrors = getProductFormIssues(issues);
      setErrors(productFormErrors);
      scrollToFirstError(productFormErrors);
    }
  }

  function handleSetCategory() {
    const category = refValue(productRef.category);
    if (isNullOrEmpty(category)) return;

    categories.add(category);
    setCategories(new Set([...categories]));
  }

  function onDeleteCategory(category: string) {
    categories.delete(category);
    setCategories(new Set([...categories]));
  }

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    // TODO: const file = e.currentTarget.files?.[0] as File;

    // TODO: const image = URL.createObjectURL(file);

    images.add("/assets/drawable/img.png");
    setImages(new Set([...images]));

    e.currentTarget.value = "";
  }

  function handleDeleteFile(img: string) {
    // TODO: URL.revokeObjectURL(img);

    images.delete(img);
    setImages(new Set([...images]));
  }

  function scrollToFirstError(formErrors: ProductFormErrors) {
    if (formErrors.name) refScroll(productRef.name);
    else if (formErrors.description) refScroll(productRef.description);
    else if (formErrors.categories) refScroll(productRef.category);
  }

  return (
    <ScrollCol sx={{ flexGrow: 1, alignItems: "center" }}>
      <Snackbar
        open={isSaved}
        onClose={() => setIsSaved(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
      >
        <Alert severity="success" variant="filled">
          Produto Salvo!
        </Alert>
      </Snackbar>
      <Form
        sx={{
          padding: 2,
          gap: 2,
          maxWidth: 900,
        }}
        onSubmit={onSave}
      >
        {/*Save*/}
        <Row sx={{ padding: 1, justifyContent: "end" }}>
          <Button
            type={"submit"}
            variant="contained"
            startIcon={<SaveRounded />}
            loading={isLoading}
            size={"large"}
          >
            Salvar
          </Button>
        </Row>

        {/*Basics*/}
        <Paper>
          <Col sx={{ padding: 2, gap: 2 }}>
            <Row sx={{ gap: 1 }}>
              <Inventory />
              <Text sx={{ fontSize: fontSize.large }}>Informações Básicas</Text>
            </Row>
            <Text>Adicione nome e descrição do produto.</Text>

            <Input
              id={"product-form-name"}
              placeholder="Nome"
              error={!!errors.name}
              helperText={errors.name}
              inputRef={productRef.name}
            />

            <Input
              id={"product-form-description"}
              placeholder="Descrição"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
              inputRef={productRef.description}
            />
          </Col>
        </Paper>

        {/*Units*/}
        <Paper>
          <Col sx={{ padding: 2, gap: 3 }}>
            <Text>
              Adicione informações sobre as variações disponíveis do produto,
              preços e quantidades.
            </Text>

            <Col sx={{ gap: 1 }}>
              <Row sx={{ gap: 2 }}>
                <Input
                  id={"product-form-unit-name"}
                  placeholder={"Nome"}
                  helperText={"Ex: Grande, média, pequena."}
                  error={!!errors.unit?.name}
                  inputRef={productRef.unit.name}
                />
                <Input
                  id={"product-form-unit-description"}
                  placeholder="Descrição"
                  helperText={"Ex: 8 Fatias, 6 Fatias, 4 Fatias"}
                  error={!!errors.unit?.description}
                  inputRef={productRef.unit.description}
                />
              </Row>

              <Row sx={{ gap: 2 }}>
                <Input
                  id={"product-form-unit-price"}
                  placeholder="Preço"
                  type={"number"}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    },
                    htmlInput: {
                      step: 0.01,
                      min: 0,
                    },
                  }}
                  error={!!errors.unit?.price}
                  helperText={errors.unit?.price}
                  inputRef={productRef.unit.price}
                />
                <Input
                  id={"product-form-unit-quantity"}
                  placeholder="Quantidade"
                  type={"number"}
                  error={!!errors.unit?.quantity}
                  helperText={errors.unit?.quantity}
                  inputRef={productRef.unit.quantity}
                />
              </Row>
            </Col>
          </Col>
        </Paper>

        {/*Category*/}
        <Paper>
          <Col sx={{ padding: 2, gap: 2 }}>
            <Text>
              Adicione categorias para ajudar os clientes a encontrarem seu
              produto mais facilmente.
            </Text>

            <Row sx={{ gap: 1 }}>
              <Input
                id={"product-form-category"}
                placeholder={"Categoria"}
                error={!!errors.categories}
                helperText={errors.categories}
                inputRef={productRef.category}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleSetCategory}
                sx={{ height: 37 }}
              >
                Adicionar
              </Button>
            </Row>

            <Divider />

            <Row sx={{ gap: 1, minHeight: 32 }}>
              {[...categories].map((category, index) => (
                <Chip
                  key={category.concat(index.toString())}
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
              <AddPhotoAlternate />
              <Text sx={{ fontSize: fontSize.large }}>Imagens</Text>
            </Row>

            <Text>
              Adicione imagens de alta qualidade do seu produto. Recomendamos
              pelo menos 3 imagens de diferentes ângulos.
            </Text>

            <Col sx={{ alignItems: "center", gap: 2 }}>
              <Deco
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
                  <AddPhotoAlternate />
                  <InputFile
                    id={"product-form-image"}
                    onChange={handleFileUpload}
                  />
                </Col>
              </Deco>
              <Conditional bool={!!errors.images}>
                <Text color={"error"}>{errors.images}</Text>
              </Conditional>
            </Col>

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
                    onClick={() => handleDeleteFile(img)}
                    sx={{ position: "absolute", right: 0 }}
                  >
                    <Delete />
                  </IconButton>
                </Col>
              ))}
            </Row>
          </Col>
        </Paper>
      </Form>
    </ScrollCol>
  );
}
