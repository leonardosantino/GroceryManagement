"use client";

import { ChangeEvent, FormEvent, useState } from "react";

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
import { Product } from "@/model/entity/Product";
import {
  getProductFormIssues,
  ProductFormErrors,
  ProductSchema,
  refScroll,
  refValue,
  ZodIssue,
} from "@/model/schema/product";

import { isNullOrEmpty } from "@/com/validation";
import { Snackbar } from "@mui/material";
import { Api } from "@/clients/Api";

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
      unity: {
        name: refValue(productRef.unity.name),
        description: refValue(productRef.unity.description),
        price: Number(refValue(productRef.unity.price)),
        quantity: Number(refValue(productRef.unity.quantity)),
      },
    };

    const form = ProductSchema.safeParse(productForm);
    const issues = form.error?.issues as ZodIssue[];

    if (form.success) {
      setIsLoading(true);

      await Api.products.save(productForm);

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
    setCategories(new Set(categories));
  }

  function onDeleteCategory(category: string) {
    categories.delete(category);
    setCategories(new Set(categories));
  }

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    // TODO: const file = e.currentTarget.files?.[0] as File;

    // TODO: const image = URL.createObjectURL(file);

    images.add("/assets/drawable/img.png");
    setImages(new Set(images));

    e.currentTarget.value = "";
  }

  function handleDeleteFile(img: string) {
    // TODO: URL.revokeObjectURL(img);

    images.delete(img);
    setImages(new Set(images));
  }

  function scrollToFirstError(formErrors: ProductFormErrors) {
    if (formErrors.name) refScroll(productRef.name);
    else if (formErrors.description) refScroll(productRef.description);
    else if (formErrors.categories) refScroll(productRef.category);
  }

  return (
    <ScrollCol align={"center"} padding={2} testId={"products-add-page"}>
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
          gap: 2,
          maxWidth: 900,
        }}
        onSubmit={onSave}
      >
        {/*Save*/}
        <Row justify={"flex-end"} height={37}>
          <Button
            type={"submit"}
            variant="outlined"
            startIcon={<SaveRounded />}
            loading={isLoading}
            size={"large"}
          >
            Salvar
          </Button>
        </Row>

        {/*Basics*/}
        <Paper>
          <Col padding={2} gap={2}>
            <Row gap={1}>
              <Inventory />
              <Text>Informações Básicas</Text>
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
          <Col padding={2} gap={2}>
            <Text>
              Adicione informações sobre as variações disponíveis do produto,
              preços e quantidades.
            </Text>

            <Col gap={1}>
              <Row gap={2}>
                <Input
                  id={"product-form-unit-name"}
                  placeholder={"Nome"}
                  helperText={"Ex: Grande, média, pequena."}
                  error={!!errors.unity?.name}
                  inputRef={productRef.unity.name}
                />
                <Input
                  id={"product-form-unit-description"}
                  placeholder="Descrição"
                  helperText={"Ex: 8 Fatias, 6 Fatias, 4 Fatias"}
                  error={!!errors.unity?.description}
                  inputRef={productRef.unity.description}
                />
              </Row>

              <Row gap={2}>
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
                  error={!!errors.unity?.price}
                  helperText={errors.unity?.price}
                  inputRef={productRef.unity.price}
                />
                <Input
                  id={"product-form-unit-quantity"}
                  placeholder="Quantidade"
                  type={"number"}
                  error={!!errors.unity?.quantity}
                  helperText={errors.unity?.quantity}
                  inputRef={productRef.unity.quantity}
                />
              </Row>
            </Col>
          </Col>
        </Paper>

        {/*Category*/}
        <Paper>
          <Col padding={2} gap={2}>
            <Text>
              Adicione categorias para ajudar os clientes a encontrarem seu
              produto mais facilmente.
            </Text>

            <Row gap={1}>
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

            <Row gap={1}>
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
          <Col padding={2} gap={2}>
            <Row gap={1}>
              <AddPhotoAlternate />
              <Text>Imagens</Text>
            </Row>

            <Text>
              Adicione imagens de alta qualidade do seu produto. Recomendamos
              pelo menos 3 imagens de diferentes ângulos.
            </Text>

            <Col align={"center"} gap={2}>
              <Deco width={400} height={200}>
                <Col
                  height={"inherit"}
                  justify={"center"}
                  align={"center"}
                  gap={3}
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
            <Row justify={"center"} gap={1}>
              {[...images].map((img) => (
                <Col key={img} position={"relative"}>
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
