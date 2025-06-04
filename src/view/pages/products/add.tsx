import AddIcon from "@mui/icons-material/Add";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  Chip,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { Col } from "@/common/ui/comps/col";
import { Paper } from "@/common/ui/comps/paper";
import { Row } from "@/common/ui/comps/row";
import { Text } from "@/common/ui/comps/text";

export function ProductsAdd() {
  const categories = ["Bebidas", "Refrigerante", "Zero Açúcar"];

  const sampleImageUrl = "https://via.placeholder.com/150";

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
      <Paper>
        <Col sx={{ padding: 2, gap: 2 }}>
          <Row sx={{ gap: 1 }}>
            <InventoryIcon />
            <Text>Informações Básicas</Text>
          </Row>
          <Text variant="caption">Adicione nome e descrição do produto</Text>

          <TextField required placeholder="Nome" />

          <TextField multiline rows={4} required placeholder="Descrição" />
        </Col>
      </Paper>

      <Divider />

      <Paper>
        <Col sx={{ padding: 2, gap: 2 }}>
          <Row sx={{ gap: 1 }}>
            <CategoryIcon />
            <Text>Categorias</Text>
          </Row>

          <Text variant="caption">
            Adicione categorias para ajudar os clientes a encontrarem seu
            produto mais facilmente
          </Text>

          <Row sx={{ gap: 1 }}>
            <TextField fullWidth placeholder="Categoria" />
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
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

      <Col sx={{ padding: 2, gap: 2 }}>
        <Row sx={{ gap: 1 }}>
          <AddPhotoAlternateIcon color="primary" />
          <Text>Imagens</Text>
        </Row>

        <Text variant="caption">
          Adicione imagens de alta qualidade do seu produto. Recomendamos pelo
          menos 3 imagens de diferentes ângulos.
        </Text>

        <Row sx={{ justifyContent: "center" }}>
          <Paper sx={{ width: 400, height: 200 }}>
            <AddPhotoAlternateIcon />
          </Paper>
        </Row>

        <Divider sx={{ my: 2 }} />

        <Text variant="subtitle2" userSelect="auto" sx={{ mb: 1 }}>
          Imagens do Produto:
        </Text>

        <Row sx={{ gap: 2, flexWrap: "wrap" }}>
          <Paper elevation={2} sx={{ p: 1, position: "relative" }}>
            <img
              src={sampleImageUrl}
              alt="Produto"
              style={{ width: 150, height: 150, objectFit: "cover" }}
            />
            <Button
              size="small"
              color="error"
              variant="contained"
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                minWidth: "auto",
                width: 30,
                height: 30,
                p: 0,
              }}
            >
              ×
            </Button>
          </Paper>
        </Row>
      </Col>

      <Divider sx={{ my: 2 }} />

      {/* Units */}
      <Col sx={{ gap: 2 }}>
        <Row sx={{ alignItems: "center", gap: 1, mb: 1 }}>
          <InventoryIcon color="primary" />
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
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
            startIcon={<AddIcon />}
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
        <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
          Salvar
        </Button>
      </Row>
    </Col>
  );
}
