import {
  Add,
  AddPhotoAlternate,
  Category,
  Inventory,
  Save,
} from "@mui/icons-material";
import { Button, Chip, Divider, TextField, Typography } from "@mui/material";
import Image from "next/image";

import { Box } from "@/common/ui/comps/box";
import { Col } from "@/common/ui/comps/col";
import { Paper } from "@/common/ui/comps/paper";
import { Row } from "@/common/ui/comps/row";
import { Text } from "@/common/ui/comps/text";
import { InputFileUpload } from "@/view/comps/input/file";

export function ProductsAdd() {
  const categories = ["Bebidas", "Refrigerante", "Zero Açúcar"];

  return (
    <Col
      sx={{
        flexGrow: 1,
        paddingY: 7,
        gap: 2,
        paddingLeft: 3,
        overflow: "auto",
        scrollbarWidth: "none",
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
          <Text variant="caption">Adicione nome e descrição do produto</Text>

          <TextField required placeholder="Nome" />

          <TextField multiline rows={4} required placeholder="Descrição" />
        </Col>
      </Paper>

      <Divider />

      {/*Category*/}
      <Paper>
        <Col sx={{ padding: 2, gap: 2 }}>
          <Row sx={{ gap: 1 }}>
            <Category />
            <Text>Categorias</Text>
          </Row>

          <Text variant="caption">
            Adicione categorias para ajudar os clientes a encontrarem seu
            produto mais facilmente
          </Text>

          <Row sx={{ gap: 1 }}>
            <TextField fullWidth placeholder="Categoria" />
            <Button variant="contained" color="primary" startIcon={<Add />}>
              Adicionar
            </Button>
          </Row>

          <Row sx={{ gap: 1 }}>
            {categories.map((category, index) => (
              <Chip key={index} label={category} onDelete={() => {}} />
            ))}
          </Row>
        </Col>
      </Paper>

      <Divider />

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

          <Row sx={{ justifyContent: "center" }}>
            <Box
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

                <InputFileUpload />
              </Col>
            </Box>
          </Row>

          <Row sx={{ justifyContent: "center" }}>
            <Col sx={{ width: 100 }}>
              <Image
                src={"/assets/drawable/img.png"}
                alt={""}
                width={100}
                height={100}
              />
            </Col>
          </Row>
        </Col>
      </Paper>

      <Divider />

      <Col sx={{ gap: 2 }}>
        <Row sx={{ alignItems: "center", gap: 1, mb: 1 }}>
          <Inventory color="primary" />
          <Text variant="h6" userSelect="auto" sx={{ fontWeight: "bold" }}>
            Unidades
          </Text>
        </Row>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Adicione informações sobre as unidades disponíveis do produto, preços
          e quantidades
        </Typography>

        <Col sx={{ gap: 2 }}>
          <Row sx={{ gap: 2 }}>
            <TextField
              label="Nome da Unidade"
              variant="outlined"
              fullWidth
              placeholder="Ex: Garrafa 2L"
              helperText="Nome da variação do produto"
            />
            <TextField
              label="Descrição da Unidade"
              variant="outlined"
              fullWidth
              placeholder="Ex: Garrafa PET 2 Litros"
              helperText="Descrição detalhada da unidade"
            />
          </Row>

          <Row sx={{ gap: 2 }}>
            <TextField
              label="Preço"
              variant="outlined"
              type="number"
              fullWidth
              placeholder="9.99"
              helperText="Preço em reais"
            />
            <TextField
              label="Quantidade"
              variant="outlined"
              type="number"
              fullWidth
              placeholder="100"
              helperText="Quantidade disponível em estoque"
            />
          </Row>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            fullWidth
          >
            Adicionar Unidade
          </Button>
        </Col>

        <Row
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Col>
            <Text
              variant="subtitle1"
              userSelect="auto"
              sx={{ fontWeight: "medium" }}
            >
              Garrafa 2L
            </Text>
            <Text variant="body2" userSelect="auto">
              Garrafa PET de 2 Litros
            </Text>
            <Row sx={{ gap: 3, mt: 1 }}>
              <Chip
                label="R$ 9,99"
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label="Estoque: 100"
                size="small"
                color="success"
                variant="outlined"
              />
            </Row>
          </Col>
          <Button color="error" variant="outlined" size="small">
            Remover
          </Button>
        </Row>
      </Col>

      <Row sx={{ justifyContent: "end" }}>
        <Button variant="contained" color="primary" startIcon={<Save />}>
          Salvar
        </Button>
      </Row>
    </Col>
  );
}
