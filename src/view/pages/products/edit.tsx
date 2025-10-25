"use client";

import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { Dialog, DialogActions } from "@mui/material";

import {
  Add,
  Empty,
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
  Row,
  ScrollCol,
  Text,
} from "@/com/ui";

import { Product } from "@/model/entity/Product";
import { Conditional } from "@/com/conditional/conditional";

import {
  getProductFormIssues,
  ProductFormErrors,
  ProductSchema,
} from "@/model/schema/product";

import { toLocalDate } from "@/com/format/date";

import { Api } from "@/clients/Api";

export function ProductsEdit() {
  const params = useSearchParams();
  const id = params.get("id") as string;

  const [product, setProduct] = useState(Product.default());
  const [category, setCategory] = useState<string>();

  const [errors, setErrors] = useState({} as ProductFormErrors);

  const { isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      Api.products
        .findById(id)
        .then((it) => setProduct(it))
        .then(() => product),
  });

  const mutation = useMutation({
    mutationFn: () => Api.products.update(product),
  });

  const deleteMutation = useMutation({
    mutationFn: () => Api.products.delete(id),
  });

  const [open, setOpen] = useState(false);

  async function onSave() {
    const form = ProductSchema.safeParse(product);

    if (form.success) {
      mutation.mutate();
    } else {
      const formErrors = getProductFormIssues(form.error.issues);

      setErrors(formErrors);
    }
  }

  function handleSetCategory(category?: string) {
    const categories = new Set(product?.categories);

    if (category) categories.add(category);

    setProduct(product.copy({ categories: [...categories] }));
  }

  function onDeleteCategory(category?: string) {
    const categories = new Set(product?.categories);

    if (category) categories.delete(category);

    setProduct(product.copy({ categories: [...categories] }));
  }

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    // TODO: const file = e.currentTarget.files?.[0] as File;

    // TODO: const image = URL.createObjectURL(file);

    const images = new Set(product?.images);

    images.add("/assets/drawable/img.png");
    setProduct(product.copy({ images: [...images] }));

    e.currentTarget.value = "";
  }

  function handleDeleteFile(img?: string) {
    // TODO: URL.revokeObjectURL(img);

    const images = new Set(product?.images);

    if (img) images.delete(img);

    setProduct(product.copy({ images: [...images] }));
  }

  function handleDeleteProduct() {
    deleteMutation.mutate();
  }

  if (isLoading) return <Empty />;

  return (
    <Col flex={1} gap={1} padding={1} testId={"products-edit-page"}>
      {/* Update */}
      <Row justify={"center"}>
        <Row width={900} padding={1} justify={"space-between"}>
          <Col>
            <Text>Atualize as informações do produto</Text>
            <Text>Última atualização em: {toLocalDate(product.updatedAt)}</Text>
          </Col>

          <Conditional bool={!mutation.isSuccess}>
            <Row gap={2}>
              <Button
                onClick={onSave}
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

          <Conditional bool={mutation.isSuccess}>
            <Alert severity="success" variant="filled" sx={{ paddingY: 0 }}>
              Dados alterados!
            </Alert>
          </Conditional>
        </Row>
      </Row>

      {/*Dialog Delete*/}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogActions>
          <Button color={"error"} onClick={handleDeleteProduct}>
            Excluir
          </Button>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      <ScrollCol>
        <Form
          sx={{
            gap: 2,
          }}
        >
          {/*Basics*/}
          <Row justify={"center"}>
            <Col width={900} padding={1} gap={2}>
              <Row gap={1}>
                <Inventory />
                <Text>Informações Básicas</Text>
              </Row>
              <Text>Adicione nome e descrição do produto.</Text>

              <Input
                id={"product-form-name"}
                placeholder="Nome"
                defaultValue={product.name}
                error={!!errors.name}
                helperText={errors.name}
                onChange={(it) =>
                  setProduct(product.copy({ name: it.currentTarget.value }))
                }
              />

              <Input
                id={"product-form-description"}
                placeholder="Descrição"
                defaultValue={product.description}
                error={!!errors.description}
                helperText={errors.description}
                onChange={(it) =>
                  setProduct(
                    product.copy({ description: it.currentTarget.value }),
                  )
                }
                multiline
                rows={4}
              />
            </Col>
          </Row>

          {/*Units*/}
          <Row justify={"center"}>
            <Col width={900} padding={1} gap={1}>
              <Text>
                Adicione informações sobre as variações disponíveis do produto,
                preços e quantidades.
              </Text>

              <Col gap={1}>
                <Row gap={2}>
                  <Input
                    id={"product-form-unit-name"}
                    placeholder={"Nome"}
                    defaultValue={product.unity?.name}
                    error={!!errors.unity?.name}
                    helperText={"Ex: Grande, média, pequena."}
                    onChange={(it) =>
                      setProduct(
                        product.copy({
                          unity: product.unity.copy({
                            name: it.currentTarget.value,
                          }),
                        }),
                      )
                    }
                  />
                </Row>

                <Row gap={2}>
                  <Input
                    id={"product-form-unit-price"}
                    placeholder="Preço"
                    defaultValue={product.unity?.price}
                    error={!!errors.unity?.price}
                    helperText={errors.unity?.price}
                    type={"number"}
                    onChange={(it) =>
                      setProduct(
                        product.copy({
                          unity: product.unity.copy({
                            price: Number(it.currentTarget.value),
                          }),
                        }),
                      )
                    }
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
                  />
                  <Input
                    id={"product-form-unit-quantity"}
                    placeholder="Quantidade"
                    defaultValue={product.unity?.quantity}
                    error={!!errors.unity?.quantity}
                    helperText={errors.unity?.quantity}
                    onChange={(it) =>
                      setProduct(
                        product.copy({
                          unity: product.unity.copy({
                            quantity: Number(it.currentTarget.value),
                          }),
                        }),
                      )
                    }
                    type={"number"}
                  />
                </Row>
              </Col>
            </Col>
          </Row>

          {/*Category*/}
          <Row justify={"center"}>
            <Col width={900} padding={1} gap={2}>
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
                  onChange={(e) => setCategory(e.currentTarget.value)}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Add />}
                  onClick={() => handleSetCategory(category)}
                  sx={{ height: 37 }}
                >
                  Adicionar
                </Button>
              </Row>

              <Divider />

              <Row gap={1}>
                {product.categories?.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onDelete={() => onDeleteCategory(category)}
                  />
                ))}
              </Row>
            </Col>
          </Row>

          {/*Images*/}
          <Row justify={"center"}>
            <Col width={900} padding={1} gap={1}>
              <Row gap={1}>
                <AddPhotoAlternate />
                <Text>Imagens</Text>
              </Row>

              <Text>
                Adicione imagens de alta qualidade do seu produto. Recomendamos
                pelo menos 3 imagens de diferentes ângulos.
              </Text>

              <Col align={"center"} gap={2}>
                <Deco
                  direction={"column"}
                  align={"center"}
                  justify={"center"}
                  gap={2}
                  width={300}
                  height={200}
                >
                  <AddPhotoAlternate />
                  <InputFile
                    id={"product-form-image"}
                    onChange={handleFileUpload}
                  />
                </Deco>
                <Conditional bool={!!errors.images}>
                  <Text color={"error"}>{errors.images}</Text>
                </Conditional>
              </Col>

              <Divider />
              <Row justify={"center"} gap={1}>
                {product.images?.map((img) => (
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
          </Row>
        </Form>
      </ScrollCol>
    </Col>
  );
}
