"use client";

import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  AddIcon,
  AddPhotoAlternateIcon,
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
  BoxSize,
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
import { getColorPrimaryOrError } from "@/com/format/color";
import { Snack, SnackData, snackData } from "@/view/comps/snack/Snack";

export function ProductsAdd() {
  const router = useRouter();

  const mutationCreate = useMutation({
    mutationFn: (it: Product) => Api.products.save(it),
  });

  const mutationStorage = useMutation({
    mutationFn: (file: File) => Api.storage.upload(file),
  });

  const [product, setProduct] = useState(Product.default());
  const [category, setCategory] = useState<string>();
  const [images, setImages] = useState<{ url: string; file?: File }[]>([]);

  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [snack, setSnack] = useState<SnackData>({ open: false });

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
        ...snackData.addProduct,
        onClose: () => {
          setSnack({ open: false });
          router.push("/products/edit?id=".concat(response.id));
        },
      });
    } else {
      const formErrors = getProductFormIssues(form.error?.issues);
      setSnack({
        ...snackData.requiredFieldsError,
        onClose: () => {
          setSnack({ open: false });
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
    <Col
      flex={1}
      gap={1}
      padding={1}
      align={"center"}
      testId={"products-add-page"}
    >
      {/*Save*/}
      <Row justify={"flex-end"} width={900} height={36}>
        <Button
          onClick={onSave}
          variant={"contained"}
          startIcon={<SaveIcon />}
          loading={mutationCreate.isPending}
          color={"success"}
        >
          Salvar
        </Button>
      </Row>

      <Snack data={snack} />

      <BoxSize height={1} />

      <ScrollCol>
        <Form direction={"column"} gap={1} width={900}>
          {/*Basics*/}
          <Row gap={2} align={"flex-start"}>
            <InventoryIcon color={"primary"} />
            <Text weight={"bold"}>Informações Básicas</Text>
          </Row>
          <Text>Adicione nome e descrição do produto.</Text>

          <BoxSize height={2} />

          <Col gap={1}>
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

          {/*Category*/}
          <BoxSize height={2} />
          <Text>
            Adicione categorias para ajudar os clientes a encontrarem seu
            produto mais facilmente.
          </Text>
          <BoxSize height={2} />

          <Col gap={1}>
            <Row gap={1}>
              <Input
                id={"product-form-category"}
                placeholder={"Categoria"}
                error={!!errors.categories}
                onChange={(e) => setCategory(e.target.value)}
              />
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleSetCategory(category)}
              >
                Adicionar
              </Button>
            </Row>

            <Divider marginY={2} />

            <Row gap={1} minHeight={32}>
              {product.categories?.map((category, index) => (
                <Chip
                  variant={"outlined"}
                  color={"success"}
                  key={category.concat(index.toString())}
                  label={category}
                  onDelete={() => onDeleteCategory(category)}
                />
              ))}
            </Row>
          </Col>

          <BoxSize height={2} />

          {/*Images*/}
          <Row gap={2}>
            <AddPhotoAlternateIcon color={"primary"} />
            <Text weight={"bold"}>Imagens</Text>
          </Row>
          <Text>
            Adicione imagens de alta qualidade do seu produto. Recomendamos pelo
            menos 3 imagens de diferentes ângulos.
          </Text>

          <BoxSize height={2} />

          <Col align={"center"} gap={1}>
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
                key={`add-image-${i.toString()}`}
                position={"relative"}
                padding={1}
              >
                <Img src={img.url} width={250} height={150} alt={""} />
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
      </ScrollCol>
    </Col>
  );
}
