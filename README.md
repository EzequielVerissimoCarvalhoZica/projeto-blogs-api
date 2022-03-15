# Boas vindas ao repositório do API de Blogs!


---

# Habilidades 

Nesse projeto, eu construi um back-end usando `ORM` com o pacote `sequelize` do `npm`, fui capaz de:
 - Criar e associar tabelas usando `models` do `sequelize`
 - Construir endpoints para consumir os models que criar 
 - Fazer um `CRUD` com o `ORM`



## Essa API foi desenvolvida respeitando o modelo REST


## O que foi desenvolvido

Arquitetei e desenvolvi uma API de um CRUD posts de blog (com o Sequelize). Começando pela API, desenvolvi alguns endpoints (seguindo os princípios do REST) que estarão conectados ao banco de dados.

O banco de dados é composto por 3 entidades, user, categorie e blog post. E contendo 4 tabelas, 1 para cada entidade e 1 pra tabela de relacionamento N:N.

Para fazer um post é necessário usuário e login, portanto será trabalhada a **relação entre** `user` e `post`. Também será necessário a utilização de categorias para seus posts, assim trabalhando a relação de `posts` para `categorias` e de `categorias` para `posts`.