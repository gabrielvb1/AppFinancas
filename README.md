# AppFinancas

- O sistema trata-se de uma aplicação para controles de finanças pessoais. 
- A aplicação está conectada com a API RESTful criada por mim no endereço https://appfinancasserver.herokuapp.com/. 
- A API se conecta com um banco de dados PostgreSQL, também criado por mim. Todos os dados são armazenados no banco, incluindo a exclusão e edição de dados.

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

Para cadastrar um novo usuário você terá que preencher o formulário na página de **cadastro**.


<img width="504" alt="image" src="https://user-images.githubusercontent.com/104026230/194585435-c156165e-c88a-4926-9120-699e41b57511.png">

*Caso todos os campos não estiverem preenchidos ou os valores dos formulários de senha não sejam os mesmos, mensagens de erros correspondentes aparecerão no formulário

Após clicar no botão Cadastrar, o usuário será redirecionado para a página de Login
### Login de usuário:

1. Na página de login de usuário, há um botão chamado **cadastro**, esse botão deve levar o usuário para a tela de cadastrar um novo usuário **(cadastro)**:
2. O formulário de login valida se os campos estão realmente preenchidos. Se sim, a aplicação permite o login do usuário.
3. Efetuado o login, o usuário é direcionado para a pagina principal **main**.
4. Caso o usuário esteja logado, ele não poderá voltar a página de login. Apenas se ele se deslogar da aplicação em um botão na página main.
<img width="1422" alt="image" src="https://user-images.githubusercontent.com/104026230/194592771-efb88c53-807f-405b-94b8-34d163d2d53c.png">

---
### Página principal (main):


Essa página só poderá ser acessada por usuários que estão logados na aplicação, caso contrário ao tentar acessar a página principal sem estar logado o usuário será redirecionado para a página de login (**login**).

Nessa página ele verá todas as informações como:
- Seu nome
- Icone para editar perfil
- Icone para log-out da página
- E a lista de transações financeiras (caso haja alguma)
- Botão de filtro por categorias
- Botão de Adicionar Transação
- Botão de Editar Transação (caso haja alguma)
- Botão de Excluir Transação (caso haja alguma)
- Resumo com o saldo das transações
Veja na imagem abaixo:
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/104026230/194592006-2a895ffe-13c8-4d22-b784-be14e09dc8f3.png">

