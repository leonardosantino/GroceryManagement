import { ChangeEvent, useState } from "react";

import { MarketApi } from "@/api/market";
import { Conditional } from "@/com/conditional/conditional";
import {
  Add,
  AddPhotoAlternate,
  Alert,
  Button,
  Category,
  Chip,
  Close,
  Col,
  Collapse,
  Deco,
  Delete,
  Divider,
  Form,
  IconButton,
  Img,
  Input,
  InputCurrency,
  InputFile,
  Inventory,
  Paper,
  Row,
  SaveRounded,
  Text,
} from "@/com/ui";
import { useProductFormRef } from "@/hooks/form/product";
import {
  getIssueMessageByPath,
  ProductForm,
  ProductFormErrors,
  ProductSchema,
  refScroll,
  refValue,
  ZodIssue,
} from "@/model/schema/product";

const api = new MarketApi();

export function ProductsAdd() {
  const productRef = useProductFormRef();

  const [isSaved, setIsSaved] = useState(false);

  const [categories, setCategories] = useState(new Set<string>());
  const [images, setImages] = useState(new Set<string>());

  const [errors, setErrors] = useState<ProductFormErrors>({});

  async function onSave() {
    const productForm: ProductForm = {
      name: refValue(productRef.name),
      description: refValue(productRef.description),
      categories: categories,
      images: images,
      unit: {
        name: refValue(productRef.unit.name),
        description: refValue(productRef.unit.description),
        price: refValue(productRef.unit.price),
        quantity: Number(refValue(productRef.unit.quantity)),
      },
    };

    const form = ProductSchema.safeParse(productForm);
    const issues = form.error?.issues as ZodIssue[];

    if (form.success) {
      const p = await api.productSave(productForm);
      setIsSaved(true);
      setErrors({});
      console.log(p);
    } else {
      console.log("ERROR");
      const productFormErrors: ProductFormErrors = {
        name: getIssueMessageByPath("name", issues),
        description: getIssueMessageByPath("description", issues),
        categories: getIssueMessageByPath("categories", issues),
        images: getIssueMessageByPath("images", issues),
        unit: {
          name: getIssueMessageByPath("unit.name", issues),
          description: getIssueMessageByPath("unit.description", issues),
          price: getIssueMessageByPath("unit.price", issues),
          quantity: getIssueMessageByPath("unit.quantity", issues),
        },
      };
      setErrors(productFormErrors);
      scrollToFirstError(productFormErrors);
    }
  }

  function handleSetCategory() {
    const category = refValue(productRef.category);

    categories.add(category);
    setCategories(new Set([...categories]));
  }

  function onDeleteCategory(category: string) {
    categories.delete(category);
    setCategories(new Set([...categories]));
  }

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0] as File;

    const image = URL.createObjectURL(file);
    images.add(image);
    setImages(new Set([...images]));

    e.currentTarget.value = "";
  }

  function handleDeleteFile(img: string) {
    URL.revokeObjectURL(img);
    images.delete(img);
    setImages(new Set([...images]));
  }

  function scrollToFirstError(formErrors: ProductFormErrors) {
    if (formErrors.name) refScroll(productRef.name);
    else if (formErrors.description) refScroll(productRef.description);
    else if (formErrors.categories) refScroll(productRef.category);
  }

  return (
    <Form
      sx={{
        padding: 2,
        gap: 2,
        maxWidth: 900,
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

          <Input
            required
            placeholder="Nome"
            error={!!errors.name}
            helperText={errors.name}
            inputRef={productRef.name}
          />

          <Input
            required
            placeholder="Descrição"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description}
            inputRef={productRef.description}
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
            <Input
              required
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
              sx={{ height: 56 }}
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
            <AddPhotoAlternate color="primary" />
            <Text>Imagens</Text>
          </Row>

          <Text variant="caption">
            Adicione imagens de alta qualidade do seu produto. Recomendamos pelo
            menos 3 imagens de diferentes ângulos.
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
                <AddPhotoAlternate color="primary" fontSize="large" />
                <InputFile onChange={handleFileUpload} />
              </Col>
            </Deco>
            <Conditional bool={!!errors.images}>
              <Text color={"error"} fontSize={"small"}>
                {errors.images}
              </Text>
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
              <Input
                required
                placeholder={"Nome"}
                helperText={"Ex: Grande, média, pequena."}
                error={!!errors.unit?.name}
                inputRef={productRef.unit.name}
              />
              <Input
                required
                placeholder="Descrição"
                helperText={"Ex: 8 Fatias, 6 Fatias, 4 Fatias"}
                error={!!errors.unit?.description}
                inputRef={productRef.unit.description}
              />
            </Row>

            <Row sx={{ gap: 2 }}>
              <InputCurrency
                required
                placeholder="Preço"
                inputRef={productRef.unit.price}
                helperText={errors.unit?.price}
                error={!!errors.unit?.price}
              />
              <Input
                required
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

      {/*Save*/}
      <Col sx={{ padding: 1, alignItems: "center" }}>
        <Collapse in={isSaved}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsSaved(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Produto salvo com sucesso!
          </Alert>
        </Collapse>
        <Collapse in={!isSaved}>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveRounded />}
            onClick={onSave}
            sx={{ height: 56, width: 200 }}
          >
            Salvar
          </Button>
        </Collapse>
      </Col>
    </Form>
  );
}
