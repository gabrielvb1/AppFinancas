# AppFinancas

O sistema trata-se de uma aplicação para controles de finanças pessoais. A aplicação está conectada com a API RESTful criada por mim no endereço https://appfinancasserver.herokuapp.com/. A API se conecta com um banco de dados PostgreSQL, também criado por mim. Todos os dados são armazenados no banco, incluindo a exclusão e edição de dados.

As funcionalidades da aplicação são: 

- Cadastro do usuário 
- Login de usuário 
- Cadastro de uma nova transação 
- Edição de uma transação 
- Exclusão de uma transação 
- Listagem de transações 
- Na parte de resumo, o valor de entradas, saídas e saldo é obtido por meio do endpoint de extrato da API construída também por mim
- Permitir o usuário filtrar a tabela por categoria
- Editar perfil de usuário
- Deslogar usuário

## Detalhamento de Requisitos:
### Cadastro de um novo usuário:

Para cadastrar um novo usuário você terá que preencher o formulário na página de **sign-up**.

<img width="504" alt="image" src="https://user-images.githubusercontent.com/104026230/194585435-c156165e-c88a-4926-9120-699e41b57511.png">

*Caso todos os campos não estiverem preenchidos, uma mensagem de erro aparecerá no formulário
