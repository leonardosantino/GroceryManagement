"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { MarketApi } from "@/clients/market";
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
  InputAdornment,
  InputFile,
  Inventory,
  Paper,
  Row,
  ScrollCol,
  Text,
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

import { isNullOrEmpty } from "@/com/validation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog, DialogActions } from "@mui/material";
import { useSearchParams } from "next/navigation";

const api = new MarketApi();

export function ProductsEdit() {
  const params = useSearchParams();

  const id = params.get("id") as string;

  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => await api.findById(id).then((data) => data),
  });

  const mutation = useMutation({
    mutationFn: (product: Product) => api.productUpdate(product),
    onSuccess: () => setIsSaved(true),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => await api.productDelete(id),
  });

  const productRef = useProductFormRef();

  const [categories, setCategories] = useState(new Set<string>());
  const [images, setImages] = useState(new Set<string>());

  const categoriesMemo = useMemo(() => data?.categories ?? [], [data]);
  const imagesMemo = useMemo(() => data?.images ?? [], [data]);

  const [errors, setErrors] = useState<ProductFormErrors>({});

  const [isSaved, setIsSaved] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  async function onSave(e: FormEvent) {
    e.preventDefault();

    const productForm: Product = {
      id: id,
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
      mutation.mutate(productForm);

      setErrors({});
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
    console.log(categories);
    console.log(category);
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

  function handleDeleteProduct() {
    deleteMutation.mutate();
  }

  function scrollToFirstError(formErrors: ProductFormErrors) {
    if (formErrors.name) refScroll(productRef.name);
    else if (formErrors.description) refScroll(productRef.description);
    else if (formErrors.categories) refScroll(productRef.category);
  }

  useEffect(() => {
    setCategories(new Set(categoriesMemo));
    setImages(new Set(imagesMemo));
  }, [categoriesMemo, imagesMemo]);

  return (
    <ScrollCol align={"center"} padding={2}>
      <Form
        sx={{
          gap: 2,
          maxWidth: 900,
        }}
        onSubmit={onSave}
      >
        {/*Save*/}
        <Row justify={"space-between"}>
          <Col>
            <Text>Atualize as informações do produto</Text>
            <Text>Última atualização em: 23 de Julho ás 14:30</Text>
          </Col>

          <Conditional bool={!isSaved}>
            <Row gap={2}>
              <Button
                type={"submit"}
                variant="contained"
                loading={mutation.isPending}
                size={"large"}
              >
                Atualizar
              </Button>

              <Button
                variant="outlined"
                color={"error"}
                sx={{ padding: 0 }}
                onClick={() => setOpen(true)}
              >
                <Delete />
              </Button>
            </Row>
          </Conditional>

          <Conditional bool={isSaved}>
            <Alert
              severity="success"
              variant="filled"
              onClose={() => setIsSaved(false)}
              sx={{ paddingY: 0 }}
            >
              Dados alterados!
            </Alert>
          </Conditional>
        </Row>

        <Dialog open={open} onClose={handleClose}>
          <DialogActions>
            <Button color={"error"} onClick={handleDeleteProduct}>
              Excluir
            </Button>
            <Button onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>

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
              defaultValue={data?.name}
              error={!!errors.name}
              helperText={errors.name}
              inputRef={productRef.name}
            />

            <Input
              id={"product-form-description"}
              defaultValue={data?.description}
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
          <Col padding={2} gap={1}>
            <Text>
              Adicione informações sobre as variações disponíveis do produto,
              preços e quantidades.
            </Text>

            <Col gap={1}>
              <Row gap={2}>
                <Input
                  id={"product-form-unit-name"}
                  placeholder={"Nome"}
                  defaultValue={data?.unity.name}
                  helperText={"Ex: Grande, média, pequena."}
                  error={!!errors.unity?.name}
                  inputRef={productRef.unity.name}
                />
                <Input
                  id={"product-form-unit-description"}
                  placeholder="Descrição"
                  defaultValue={data?.unity.description}
                  helperText={"Ex: 8 Fatias, 6 Fatias, 4 Fatias"}
                  error={!!errors.unity?.description}
                  inputRef={productRef.unity.description}
                />
              </Row>

              <Row gap={2}>
                <Input
                  id={"product-form-unit-price"}
                  placeholder="Preço"
                  defaultValue={data?.unity.price}
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
                  defaultValue={data?.unity.quantity}
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
                variant="outlined"
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
              {[...categories].map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onDelete={() => onDeleteCategory(category)}
                />
              ))}
            </Row>
          </Col>
        </Paper>

        {/*Images*/}
        <Paper>
          <Col padding={2} gap={1}>
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
