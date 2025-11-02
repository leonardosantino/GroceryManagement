import { Product } from "@/model/entity/Product";
import { Unity } from "@/model/objects/Unity";

export class ProductFixture {
  static product8dc2 = Product.from({
    id: "68bc4278465b362821a48dc2",
    seller: "1",
    name: "Mussarela",
    description:
      "Massa, molho de tomate, queijo mussarela, orégano e azeitonas",
    categories: ["Pizza"],
    images: [
      "https://static.ifood-static.com.br/image/upload/t_medium/pratos/05c7d525-abea-4ba1-9ca2-f996c126486b/202102182239_vvyy_.jpeg",
    ],
    unity: Unity.from({
      name: "Grande",
      price: 69.9,
      quantity: 8,
    }),
  });

  static product7cd7f = Product.from({
    id: "68bc46a481aad14b7647cd7f",
    seller: "1",
    name: "Marguerita",
    description:
      "Massa, molho de tomate, queijo mussarela, tomate fatiado, manjericão, orégano e azeitonas",
    categories: ["Pizza"],
    images: [
      "https://static.ifood-static.com.br/image/upload/t_medium/pratos/05c7d525-abea-4ba1-9ca2-f996c126486b/202108061251_BYYF_i.jpg",
    ],
    unity: Unity.from({
      name: "Média",
      price: 59.9,
      quantity: 8,
    }),
  });

  static product7cd80 = Product.from({
    id: "68bc46b281aad14b7647cd80",
    seller: "1",
    name: "Calabresa",
    description:
      "Uma combinação irresistível de calabresa defumada e queijo coalho da fazenda, trazendo o sabor autêntico do Nordeste para sua pizza. Finalizada com orégano e cebola, essa delícia vai conquistar seu paladar desde a primeira mordida!",
    categories: ["Pizza"],
    images: [
      "https://static.ifood-static.com.br/image/upload/t_medium/pratos/05c7d525-abea-4ba1-9ca2-f996c126486b/202102182239_zSZU_.jpeg",
    ],
    unity: Unity.from({
      name: "Pequena",
      price: 49.9,
      quantity: 8,
    }),
  });
}
