import express from "express";

const host = "0.0.0.0";
const port = 3000;

let listaProdutos = [];

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>{
    res.send(`<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cadastro de Produto</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
  <style>
    body {
      background:rgb(0, 117, 235);
    }
    .form-container {
      max-width: 600px;
      margin: 50px auto;
    }
  </style>
</head>
<body>

  <div class="container form-container">
    <div class="card shadow rounded-4">
      <div class="card-body p-4">
        <h3 class="card-title text-center mb-4">Cadastro de Produto</h3>
        <form method="POST" action="/">
          <div class="mb-3">
            <label for="nome" class="form-label">Nome do Produto</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-box"></i></span>
              <input type="text" class="form-control" id="nome" name="nome" placeholder="Digite o nome do produto">
            </div>
          </div>

          <div class="mb-3">
            <label for="descricao" class="form-label">Descrição</label>
            <textarea class="form-control" id="descricao" name="descricao" rows="3" placeholder="Breve descrição do produto"></textarea>
          </div>

          <div class="mb-3">
            <label for="categoria" class="form-label">Categoria</label>
            <select class="form-select" id="categoria" name="categoria" >
              <option selected disabled>Selecione uma categoria</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="vestuario">Vestuário</option>
              <option value="alimentos">Alimentos</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="quantidade" class="form-label">Quantidade em Estoque</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-stack"></i></span>
              <input type="number" class="form-control" id="quantidade" name="quantidade" min="0" >
            </div>
          </div>

          <div class="mb-4">
            <label for="preco" class="form-label">Preço de Venda (R$)</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
              <input type="number" class="form-control" id="preco" name="preco" step="0.01" min="0" >
            </div>
          </div>

          <div class="d-grid">
            <button type="submit"  id="btn" class="btn btn-primary btn-lg">Cadastrar Produto</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`);
res.end();
});







app.post("/", (req, res) =>{
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const categoria = req.body.categoria;
    const quantidade = req.body.quantidade;
    const preco = req.body.preco;


    if(nome && descricao && categoria && quantidade && preco){
        listaProdutos.push({
            nome: nome,
            descricao: descricao,
            categoria: categoria,
            quantidade: quantidade,
            preco: preco,
        });
        res.redirect("/listarProdutos");
    }else{
        let conteudo = `
                <html lang="pt-br">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Cadastro de Produto</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
                <style>
                    body {
                    background:rgb(0, 117, 235);
                    }
                    .form-container {
                    max-width: 600px;
                    margin: 50px auto;
                    }
                </style>
                </head>
                <body>

                <div class="container form-container">
                    <div class="card shadow rounded-4">
                    <div class="card-body p-4">
                        <h3 class="card-title text-center mb-4">Cadastro de Produto</h3>
                        <form method="POST" action="/">
                        
        `;
        if(!nome){
            conteudo = conteudo + `
                <div class="mb-3">
                            <label for="nome" class="form-label">Nome do Produto</label>
                            <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-box"></i></span>
                            <input type="text" class="form-control" id="nome" name="nome" placeholder="Digite o nome do produto">
                            </div>
                            <span class="text-danger">Por favor informe o nome</span>
                </div>
            `
        }else{
            conteudo = conteudo + `
                <div class="mb-3">
                            <label for="nome" class="form-label">Nome do Produto</label>
                            <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-box"></i></span>
                            <input type="text" class="form-control" id="nome" name="nome" value="${nome}" >
                            </div>
                </div>
            `
        }

        if(!descricao){
            conteudo = conteudo + `
                <div class="mb-3">
                    <label for="descricao" class="form-label">Descrição</label>
                    <textarea class="form-control" id="descricao" name="descricao" rows="3" placeholder="Breve descrição do produto"></textarea>
                    <span class="text-danger">Por favor informe a descrição</span>
                </div>
            `
        }else{
            conteudo = conteudo + `
                <div class="mb-3">
                    <label for="descricao" class="form-label">Descrição</label>
                    <textarea class="form-control" id="descricao" name="descricao" rows="3">${descricao}</textarea>
                </div>
            `
        }

        if(!categoria){
            conteudo = conteudo + `
                <div class="mb-3">
                    <label for="categoria" class="form-label">Categoria</label>
                    <select class="form-select" id="categoria" name="categoria" >
                        <option selected disabled>Selecione uma categoria</option>
                        <option value="eletronicos">Eletrônicos</option>
                        <option value="vestuario">Vestuário</option>
                        <option value="alimentos">Alimentos</option>
                    </select>
                    <span class="text-danger">Por favor selecione a categoria</span>
                </div>
            `
        }else{
            conteudo = conteudo + `
                <div class="mb-3">
                    <label for="categoria" class="form-label">Categoria</label>
                    <select class="form-select" id="categoria" name="categoria" >
                        <option disabled>Selecione uma categoria</option>
                        <option value="eletronicos" ${categoria === "eletronicos" ? "selected" : ""}>Eletrônicos</option>
                        <option value="vestuario" ${categoria === "vestuario" ? "selected" : ""}>Vestuário</option>
                        <option value="alimentos" ${categoria === "alimentos" ? "selected" : ""}>Alimentos</option>
                    </select>
                </div>
            `
        }

        if(!quantidade){
            conteudo = conteudo + `
                <div class="mb-3">
                    <label for="quantidade" class="form-label">Quantidade em Estoque</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-stack"></i></span>
                        <input type="number" class="form-control" id="quantidade" name="quantidade" min="0" >
                        
                    </div>
                    <span class="text-danger">Por favor informe a quantidade</span>
                </div>
            `
        }else{
            conteudo = conteudo + `
                <div class="mb-3">
                    <label for="quantidade" class="form-label">Quantidade em Estoque</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-stack"></i></span>
                        <input type="number" class="form-control" id="quantidade" name="quantidade" value="${quantidade}" min="0" >
                    </div>
                </div>
            `
        }

        if(!preco){
            conteudo = conteudo + `
                <div class="mb-4">
                    <label for="preco" class="form-label">Preço de Venda (R$)</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                        <input type="number" class="form-control" id="preco" name="preco" step="0.01" min="0" >
                        
                    </div>
                    <span class="text-danger">Por favor informe o preço</span>
                </div>
            `
        }else{
            conteudo = conteudo + `
                <div class="mb-4">
                    <label for="preco" class="form-label">Preço de Venda (R$)</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                        <input type="number" class="form-control" id="preco" name="preco" value="${preco}" step="0.01" min="0" >
                    </div>
                </div>
            `
        }

        conteudo = conteudo + `
            <div class="d-grid">
                <button type="submit" id="btn" class="btn btn-primary btn-lg">Cadastrar Produto</button>
            </div>
            </form>
            </div>
            </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            </body>
            </html>
        `;

        res.send(conteudo);
        res.end();
    }
})

app.get("/listarProdutos", (req, res)=>{
     let conteudo = `
            <!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Listagem de Produtos</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
  <style>
    body {
      background:rgb(0, 117, 235);
    }
    .table-container {
      max-width: 1000px;
      margin: 50px auto;
    }
  </style>
</head>
<body>

  <div class="container table-container">
    <div class="card shadow rounded-4">
      <div class="card-body p-4">
        <h3 class="card-title text-center mb-4">Lista de Produtos</h3>
        
        <div class="table-responsive">
          <table class="table table-striped table-bordered align-middle">
            <thead class="table-primary">
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Quantidade</th>
                <th>Preço (R$)</th>
              </tr>
            </thead>
            <tbody>
            `;
        for (let i = 0; i < listaProdutos.length; i++) {
        conteudo = conteudo + `
                                    <tr>
                                        <td>${listaProdutos[i].nome}</td>
                                        <td>${listaProdutos[i].descricao}</td>
                                        <td>${listaProdutos[i].categoria}</td>
                                        <td>${listaProdutos[i].quantidade}</td>
                                        <td>${listaProdutos[i].preco}</td>
                                    </tr>
                                `;
    }

    conteudo = conteudo + `
            </tbody>
          </table>
        </div>

        <div class="text-end mt-4">
          <a href="/" class="btn btn-success"><i class="bi bi-plus-circle"></i> Novo Produto</a>
        </div>

      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
     `
     res.send(conteudo);
     res.end();
});


app.listen(port, host, () => {
    console.log(`Servidor em execução em http://localhost:${port}/`);
});
