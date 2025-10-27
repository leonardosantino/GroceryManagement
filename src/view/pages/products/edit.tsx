"use client";

import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import {
  AddIcon,
  Empty,
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
  InputAdornment,
  InputFile,
  InventoryIcon,
  Row,
  ScrollCol,
  Text,
  Dialog,
  DialogActions,
  Conditional,
} from "@/com/ui/comps";

import { Product } from "@/model/entity/Product";

import {
  getProductFormIssues,
  ProductFormErrors,
  ProductSchema,
} from "@/model/schema/product";

import { toLocalDate } from "@/com/format/date";

import { Api } from "@/clients/Api";
import { isNull } from "@/com/validation";

export function ProductsEdit() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") as string;

  const [product, setProduct] = useState(Product.default());
  const [images, setImages] = useState<{ url: string; file: File | null }[]>(
    product.images.map((it) => ({ url: it, file: null })),
  );
  const [category, setCategory] = useState<string>();

  const [errors, setErrors] = useState({} as ProductFormErrors);

  const { isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      Api.products
        .findById(id)
        .then((it) => setItProduct(it))
        .then((it) => setItImages(it)),
  });

  function setItProduct(it: Product) {
    setProduct(it);
    return it;
  }

  function setItImages(it: Product) {
    const imgs = it.images.map((it) => ({ url: it, file: null }));
    setImages(imgs);
    return it;
  }

  const mutationUpdate = useMutation({
    mutationFn: (it: Product) => Api.products.update(it),
  });

  const mutationStorage = useMutation({
    mutationFn: (file: File) => Api.storage.upload(file),
  });

  const mutationDelete = useMutation({
    mutationFn: () => Api.products.delete(id),
  });

  const [open, setOpen] = useState(false);

  async function onSave() {
    const form = ProductSchema.safeParse(product);

    if (form.success) {
      const files = images
        .filter((it) => !isNull(it.file))
        .map((it) => it.file) as File[];
      const imgs = images.filter((it) => isNull(it.file)).map((it) => it.url);

      const promises = files.map((it) => mutationStorage.mutateAsync(it));
      const data = await Promise.all(promises);

      const urls = data.map((it) => it.url);

      mutationUpdate.mutate(product.copy({ images: imgs.concat(urls) }));
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

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0] as File;
    const img = URL.createObjectURL(file);

    const imgs = new Set(images);

    imgs.add({ url: img, file });

    setImages([...imgs]);

    e.currentTarget.value = "";
  }

  function handleDeleteFile(img: { url: string; file: File | null }) {
    const imgs = new Set(images);

    if (img.file) URL.revokeObjectURL(img.url);
    if (img) imgs.delete(img);

    setImages([...imgs]);
  }

  function handleDeleteProduct() {
    mutationDelete.mutate();

    router.push("/products/list");
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

          <Conditional bool={!mutationUpdate.isSuccess}>
            <Row gap={2}>
              <Button
                onClick={onSave}
                variant="contained"
                loading={mutationUpdate.isPending}
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
                <DeleteIcon />
              </Button>
            </Row>
          </Conditional>

          <Conditional bool={mutationUpdate.isSuccess}>
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
        <Form direction={"column"} gap={2}>
          {/*Basics*/}
          <Row justify={"center"}>
            <Col width={900} padding={1} gap={2}>
              <Row gap={1}>
                <InventoryIcon />
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
                  startIcon={<AddIcon />}
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
                <AddPhotoAlternateIcon />
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
                  <AddPhotoAlternateIcon />
                  <InputFile
                    id={"product-form-image"}
                    onChange={handleImageUpload}
                  />
                </Deco>
                <Conditional bool={!!errors.images}>
                  <Text color={"error"}>{errors.images}</Text>
                </Conditional>
              </Col>

              <Divider />
              <Row justify={"center"} gap={1}>
                {images.map((img) => (
                  <Col key={`image-${img.url}`} position={"relative"}>
                    <Img src={img.url} alt={""} width={200} height={100} />
                    <IconButton
                      onClick={() => handleDeleteFile(img)}
                      sx={{ position: "absolute", right: 0 }}
                    >
                      <DeleteIcon />
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
