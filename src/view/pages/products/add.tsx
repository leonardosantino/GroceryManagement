"use client";

import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

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
  Row,
  SaveRounded,
  ScrollCol,
  Text,
  InputAdornment,
  Snackbar,
} from "@/com/ui/comps";

import { Conditional } from "@/com/conditional/conditional";
import { Product } from "@/model/entity/Product";

import {
  getProductFormIssues,
  ProductFormErrors,
  ProductSchema,
} from "@/model/schema/product";

import { Api } from "@/clients/Api";

export function ProductsAdd() {
  const [product, setProduct] = useState(Product.default());
  const [category, setCategory] = useState<string>();

  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: () => Api.products.update(product),
  });

  const [errors, setErrors] = useState<ProductFormErrors>({});

  async function onSave() {
    const form = ProductSchema.safeParse(product);

    if (form.success) {
      mutate();

      setProduct(Product.default());
    } else {
      const formErrors = getProductFormIssues(form.error?.issues);
      setErrors(formErrors);
    }
  }

  function handleSetCategory(category?: string) {
    const categories = new Set(product?.categories);

    if (category) categories.add(category);

    setProduct(product.copy({ categories: [...categories] }));
  }

  function onDeleteCategory(category: string) {
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

  function handleDeleteFile(img: string) {
    // TODO: URL.revokeObjectURL(img);

    const images = new Set(product?.images);

    if (img) images.delete(img);

    setProduct(product.copy({ categories: [...images] }));
  }

  return (
    <Col flex={1} gap={1} padding={1} testId={"products-add-page"}>
      {/*Save*/}
      <Row justify={"center"}>
        <Row width={900} padding={1} justify={"flex-end"}>
          <Button
            onClick={onSave}
            variant="outlined"
            startIcon={<SaveRounded />}
            loading={isPending}
            size={"large"}
          >
            Salvar
          </Button>
        </Row>
      </Row>

      <Snackbar
        open={isSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
      >
        <Alert severity="success" variant="filled">
          Produto Salvo!
        </Alert>
      </Snackbar>

      <ScrollCol>
        <Form gap={2}>
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
                error={!!errors.name}
                helperText={errors.name}
                onChange={(it) =>
                  setProduct(product.copy({ name: it.currentTarget.value }))
                }
              />

              <Input
                id={"product-form-description"}
                placeholder="Descrição"
                error={!!errors.description}
                helperText={errors.description}
                onChange={(it) =>
                  setProduct(
                    product.copy({ description: it.currentTarget.value }),
                  )
                }
                multiline
                rows={4}
                fullWidth
              />
            </Col>
          </Row>

          {/*Units*/}
          <Row justify={"center"}>
            <Col width={900} padding={1} gap={2}>
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
                    error={!!errors.unity?.price}
                    helperText={errors.unity?.price}
                    onChange={(it) =>
                      setProduct(
                        product.copy({
                          unity: product.unity.copy({
                            price: Number(it.currentTarget.value),
                          }),
                        }),
                      )
                    }
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
                  />
                  <Input
                    id={"product-form-unit-quantity"}
                    placeholder="Quantidade"
                    type={"number"}
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
                  onChange={(e) => setCategory(e.target.value)}
                />
                <Button
                  variant="contained"
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
                {product.categories?.map((category, index) => (
                  <Chip
                    key={category.concat(index.toString())}
                    label={category}
                    onDelete={() => onDeleteCategory(category)}
                  />
                ))}
              </Row>
            </Col>
          </Row>

          {/*Images*/}
          <Row justify={"center"}>
            <Col width={900} padding={1} gap={2}>
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
                    <Img src={img} alt={img} width={200} height={100} />
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
