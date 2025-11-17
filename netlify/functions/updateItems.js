// netlify/functions/updateItems.js
let itens = [
  {
    "id": 1,
    "nome": "Brinco Búzios",
    "categoria": "brincos",
    "preco": 24.90,
    "estoque": true,
    "imagem": "/images/brinco_buzios.jpeg",
    "descricao": "Brinco de pino, dourado, com uma concha natural (búzio)...",
    "materiais": "Banhado a verniz e resina",
    "tamanho": "5cm de altura"
  },
  // ... coloque aqui os outros itens do seu JSON
];

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);

    if (!data.id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "É necessário informar o ID do item." }),
      };
    }

    // Verifica se o item já existe
    const index = itens.findIndex(item => item.id === data.id);

    if (index !== -1) {
      // Atualiza item existente
      itens[index] = { ...itens[index], ...data };
    } else {
      // Adiciona novo item
      itens.push(data);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item atualizado com sucesso!", itens }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro ao processar dados", error: error.message }),
    };
  }
};

