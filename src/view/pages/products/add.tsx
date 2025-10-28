"use client";

import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  AddIcon,
  AddPhotoAlternateIcon,
  Alert,
  Button,
  Chip,
  Col,
  Deco,
  DeleteIcon,
  Divider,
  Form,
  IconButton,
  Img,
  Input,
  InputFile,
  InventoryIcon,
  Row,
  SaveIcon,
  ScrollCol,
  Text,
  InputAdornment,
  Snackbar,
  AlertColor,
} from "@/com/ui/comps";

import { Product } from "@/model/entity/Product";

import {
  getProductFormIssues,
  ProductFormErrors,
  ProductSchema,
} from "@/model/schema/product";

import { Api } from "@/clients/Api";
import { Slide } from "@/view/comps/slide/Slide";
import { useRouter } from "next/navigation";
import { isNull } from "@/com/validation";
import { getColorForImagesError } from "@/com/format/color";

export function ProductsAdd() {
  const router = useRouter();

  const [product, setProduct] = useState(Product.default());
  const [category, setCategory] = useState<string>();
  const [images, setImages] = useState<{ url: string; file?: File }[]>([]);

  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [snack, setSnack] = useState<{
    open: boolean;
    onClose?: () => void;
    severity?: AlertColor;
    message?: string;
  }>({
    open: false,
  });

  const mutationCreate = useMutation({
    mutationFn: (it: Product) => Api.products.save(it),
  });

  const mutationStorage = useMutation({
    mutationFn: (file: File) => Api.storage.upload(file),
  });

  async function onSave() {
    const imagesShema = images
      .map((it) => it.file?.name)
      .filter((it) => !isNull(it)) as string[];

    const productSchema = product.copy({ images: imagesShema });

    const form = ProductSchema.safeParse(productSchema);

    if (form.success) {
      const promises = images.map((it) =>
        mutationStorage.mutateAsync(it.file as File),
      );

      const data = await Promise.all(promises);

      const urls = data.map((it) => it.url);

      const response = await mutationCreate.mutateAsync(
        product.copy({ images: urls }),
      );

      setSnack({
        open: true,
        severity: "success",
        message: "Produto criado com sucesso!",
        onClose: () => router.push("/products/edit?id=".concat(response.id)),
      });
    } else {
      const formErrors = getProductFormIssues(form.error?.issues);
      setSnack({
        open: true,
        severity: "error",
        onClose: () => setSnack({ open: false }),
        message: "Os campos obrigatórios não foram preenchidos.",
      });
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

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0] as File;
    const img = URL.createObjectURL(file);

    const imgs = new Set(images);

    imgs.add({ url: img, file });

    setImages([...imgs]);

    e.currentTarget.value = "";
  }

  function handleDeleteFile(img: { url: string; file?: File }) {
    const imgs = new Set(images);

    if (img.file) URL.revokeObjectURL(img.url);

    imgs.delete(img);

    setImages([...imgs]);
  }

  return (
    <Col flex={1} gap={1} padding={1} testId={"products-add-page"}>
      {/*Save*/}
      <Row justify={"center"}>
        <Row width={900} justify={"flex-end"} height={40}>
          <Button
            onClick={onSave}
            variant="outlined"
            startIcon={<SaveIcon />}
            loading={mutationCreate.isPending}
            size={"large"}
          >
            Salvar
          </Button>
        </Row>
      </Row>

      <Snackbar
        open={snack.open}
        onClose={snack.onClose}
        autoHideDuration={6000}
        message={snack.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>

      <ScrollCol>
        <Form direction={"column"} gap={1}>
          {/*Basics*/}
          <Row justify={"center"}>
            <Col width={900} padding={1} gap={1}>
              <Row gap={1}>
                <InventoryIcon />
                <Text>Informações Básicas</Text>
              </Row>
              <Text>Adicione nome e descrição do produto.</Text>

              <Input
                id={"product-form-name"}
                placeholder="Nome"
                error={!!errors.name}
                onChange={(it) =>
                  setProduct(product.copy({ name: it.currentTarget.value }))
                }
              />

              <Input
                id={"product-form-description"}
                placeholder="Descrição"
                error={!!errors.description}
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
            <Col width={900} padding={1} gap={1}>
              <Text>
                Adicione informações sobre as variações disponíveis do produto,
                preços e quantidades.
              </Text>

              <Col gap={1}>
                <Row gap={1}>
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

                <Row gap={1}>
                  <Input
                    id={"product-form-unit-price"}
                    placeholder="Preço"
                    error={!!errors.unity?.price}
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
            <Col width={900} padding={1} gap={1}>
              <Text>
                Adicione categorias para ajudar os clientes a encontrarem seu
                produto mais facilmente.
              </Text>

              <Row gap={1}>
                <Input
                  id={"product-form-category"}
                  placeholder={"Categoria"}
                  error={!!errors.categories}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleSetCategory(category)}
                  sx={{ height: 37 }}
                >
                  Adicionar
                </Button>
              </Row>

              <Divider />

              <Row gap={1} height={32}>
                {product.categories?.map((category, index) => (
                  <Chip
                    color={"info"}
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
            <Col width={900} padding={1} gap={1}>
              <Row gap={1}>
                <AddPhotoAlternateIcon />
                <Text>Imagens</Text>
              </Row>

              <Text>
                Adicione imagens de alta qualidade do seu produto. Recomendamos
                pelo menos 3 imagens de diferentes ângulos.
              </Text>

              <Col align={"center"} gap={1}>
                <AddPhotoAlternateIcon
                  fontSize={"large"}
                  color={getColorForImagesError(errors)}
                />
                <InputFile
                  id={"product-form-image"}
                  color={getColorForImagesError(errors)}
                  onChange={handleImageUpload}
                />
              </Col>

              <Divider />
              <Slide slides={3}>
                {images.map((img, i) => (
                  <Deco
                    key={`add-image-${i.toString()}`}
                    position={"relative"}
                    padding={1}
                  >
                    <Img src={img.url} alt={""} width={250} height={150} />
                    <IconButton
                      onClick={() => handleDeleteFile(img)}
                      sx={{ position: "absolute", right: 0 }}
                    >
                      <DeleteIcon color={"error"} />
                    </IconButton>
                  </Deco>
                ))}
              </Slide>
            </Col>
          </Row>
        </Form>
      </ScrollCol>
    </Col>
  );
}
