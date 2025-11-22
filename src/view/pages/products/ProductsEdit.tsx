"use client";

import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import {
  AddIcon,
  Empty,
  AddPhotoAlternateIcon,
  Button,
  Chip,
  Col,
  Deco,
  DeleteIcon,
  Divider,
  Form,
  IconButton,
  Image,
  Input,
  InputAdornment,
  InputFile,
  InventoryIcon,
  Row,
  Scroll,
  Text,
  Dialog,
  DialogActions,
  SaveIcon,
  BoxSize,
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
import { Slide } from "@/view/comps/slide/Slide";
import { getColorPrimaryOrError } from "@/com/format/color";
import { Snack, SnackProps, DataSnack } from "@/view/comps/snack/Snack";

export function ProductsEdit() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") as string;

  const { data, isPending } = useQuery({
    queryKey: ["product", id],
    queryFn: () => Api.products.findById(id).then((it) => setItProduct(it)),
  });

  const mutationUpdate = useMutation({
    mutationFn: (it: Product) => Api.products.update(it),
  });

  const mutationStorage = useMutation({
    mutationFn: (file: File) => Api.storage.upload(file),
  });

  const mutationDelete = useMutation({
    mutationFn: () => Api.products.delete(id),
  });

  const [product, setProduct] = useState(data as Product);
  const [category, setCategory] = useState<string>();
  const [images, setImages] = useState<{ url: string; file?: File }[]>([]);

  const [errors, setErrors] = useState({} as ProductFormErrors);
  const [snack, setSnack] = useState<SnackProps>({ data: { open: false } });

  const [dialogDelete, setDialogDelete] = useState(false);

  function setItProduct(it: Product) {
    const imgs = it.images.map((it) => ({ url: it }));
    setImages(imgs);
    setProduct(it);
    return it;
  }

  async function onSave() {
    const imagesShema = images.map((it) => it.url);

    const productSchema = product.copy({ images: imagesShema });

    const form = ProductSchema.safeParse(productSchema);

    if (form.success) {
      const files = images
        .filter((it) => !isNull(it.file))
        .map((it) => it.file) as File[];
      const imgs = images.filter((it) => isNull(it.file)).map((it) => it.url);

      const promises = files.map((it) => mutationStorage.mutateAsync(it));
      const data = await Promise.all(promises);

      const urls = data.map((it) => it.url);

      mutationUpdate.mutate(product.copy({ images: imgs.concat(urls) }));

      setErrors({});
      setSnack({
        data: DataSnack.updateProduct,
        onClose: () => {
          setSnack({ data: { open: false } });
        },
      });
    } else {
      const formErrors = getProductFormIssues(form.error.issues);

      setSnack({
        data: DataSnack.requiredFieldsError,
        onClose: () => {
          setSnack({ data: { open: false } });
        },
      });

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

  function handleDeleteFile(img: { url: string; file?: File }) {
    const imgs = new Set(images);

    if (img.file) URL.revokeObjectURL(img.url);

    imgs.delete(img);

    setImages([...imgs]);
  }

  function handleDeleteProduct() {
    mutationDelete.mutate();

    router.push("/products/list");
  }

  if (isPending) return <Empty />;

  return (
    <Col flex={1} padding={1} marginX={12} testId={"products-edit-page"}>
      {/*FEEDBACK*/}
      <Snack {...snack} />

      {/*DIALOG ON DELETE*/}
      <Dialog open={dialogDelete} onClose={() => setDialogDelete(false)}>
        <DialogActions>
          <Button color={"error"} onClick={handleDeleteProduct}>
            Excluir
          </Button>
          <Button onClick={() => setDialogDelete(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      {/*HEADER*/}
      <Row justify={"space-between"}>
        <Col>
          <Text size={"small"}>
            Criado em: {toLocalDate(product.createdAt)}
          </Text>
          <Text size={"small"}>
            Última atualização: {toLocalDate(product.updatedAt)}
          </Text>
        </Col>

        <Row gap={1}>
          <Button
            variant="outlined"
            color={"error"}
            onClick={() => setDialogDelete(true)}
          >
            <DeleteIcon />
          </Button>
          <Button
            color={"success"}
            onClick={onSave}
            variant="contained"
            startIcon={<SaveIcon />}
            loading={mutationUpdate.isPending}
          >
            Atualizar
          </Button>
        </Row>
      </Row>

      <BoxSize height={9} />

      <Scroll>
        <Form direction={"column"} gap={1}>
          {/*Basics*/}
          <Row align={"flex-start"} gap={3}>
            <InventoryIcon color={"primary"} />
            <Text weight={"bold"}>Informações Básicas</Text>
          </Row>

          <Text>Adicione nome e descrição do produto.</Text>

          <BoxSize height={2} />

          <Col gap={1}>
            <Input
              id={"product-form-name"}
              placeholder="Nome"
              defaultValue={product.name}
              error={!!errors.name}
              onChange={(it) =>
                setProduct(product.copy({ name: it.currentTarget.value }))
              }
            />

            <Input
              id={"product-form-description"}
              placeholder="Descrição"
              defaultValue={product.description}
              error={!!errors.description}
              onChange={(it) =>
                setProduct(
                  product.copy({ description: it.currentTarget.value }),
                )
              }
              multiline
              rows={4}
            />
          </Col>

          {/*Units*/}
          <BoxSize height={2} />

          <Text>
            Adicione informações sobre as variações disponíveis do produto,
            preços e quantidades.
          </Text>

          <BoxSize height={2} />

          <Col gap={1}>
            <Row>
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

            <Row gap={1}>
              <Input
                id={"product-form-unit-price"}
                placeholder="Preço"
                defaultValue={product.unity?.price.toFixed(2)}
                error={!!errors.unity?.price}
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
                type={"number"}
                defaultValue={product.unity?.quantity}
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

          {/*Category*/}
          <BoxSize height={2} />
          <Text>
            Adicione categorias para ajudar os clientes a encontrarem seu
            produto mais facilmente.
          </Text>
          <BoxSize height={2} />

          <Col>
            <Row gap={1}>
              <Input
                id={"product-form-category"}
                placeholder={"Categoria"}
                error={!!errors.categories}
                onChange={(e) => setCategory(e.currentTarget.value)}
              />
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleSetCategory(category)}
              >
                Adicionar
              </Button>
            </Row>

            <Divider marginY={2} />

            <Row height={32}>
              {product.categories?.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  variant={"outlined"}
                  color={"success"}
                  onDelete={() => onDeleteCategory(category)}
                />
              ))}
            </Row>
          </Col>

          <BoxSize height={2} />

          {/*Images*/}
          <Row gap={3}>
            <AddPhotoAlternateIcon color={"primary"} />
            <Text weight={"bold"}>Imagens</Text>
          </Row>
          <Text>
            Adicione imagens de alta qualidade do seu produto. Recomendamos pelo
            menos 3 imagens de diferentes ângulos.
          </Text>

          <BoxSize height={2} />

          <Col align={"center"} gap={3}>
            <AddPhotoAlternateIcon
              fontSize={"large"}
              color={getColorPrimaryOrError(errors.images)}
            />
            <InputFile
              id={"product-form-image"}
              color={getColorPrimaryOrError(errors.images)}
              onChange={handleImageUpload}
            />
          </Col>

          <Divider marginY={2} />

          {/* Images show list */}
          <Slide slides={3}>
            {images.map((img, i) => (
              <Deco
                key={`edit-image-${i.toString()}`}
                position={"relative"}
                padding={1}
              >
                <Image src={img.url} width={250} height={150} alt={""} />
                <IconButton
                  onClick={() => handleDeleteFile(img)}
                  sx={{ position: "absolute", right: 0 }}
                >
                  <DeleteIcon color={"error"} />
                </IconButton>
              </Deco>
            ))}
          </Slide>
        </Form>
      </Scroll>
    </Col>
  );
}
