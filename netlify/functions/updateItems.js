const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Use POST apenas",
    };
  }

  try {
    const novoItem = JSON.parse(event.body);

    const filePath = path.join(__dirname, "../../items.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Verifica se o item já existe
    const index = data.findIndex((item) => item.id === novoItem.id);

    if (index >= 0) {
      // Atualizar item existente
      data[index] = novoItem;
    } else {
      // Adicionar novo item
      data.push(novoItem);
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item atualizado com sucesso!" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Erro: " + err.message,
    };
  }
};
