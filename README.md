# Ecoleta
![Logo do ecoleta](/ecoleta/src/assets/logo.svg)

Este projeto foi desenvolvido em um evento realizado pela [Rocketseat](https://rocketseat.com.br/), na semana NextLevelWeek, é um projeto voltado para a coleta de recicláveis. Onde é registrado no sistemas os pontos de coleta deste material.

* colete - back-end
* ecoleta - front-end
* mobile - App

#### Instalação

> yarn install ou npm install

Para que tudo funcione perfeitamente ao clonar ou baixar o repositório em questão.

# Tecnologias usadas

* NodeJS - back-end
* Typescript
* Javascript
* ReactJS - front-end
* ReactNative - mobile

E algumas outra bibliotecas como; [axios](https://github.com/axios/axios),
[knexjs](https://knexjs.org/), [leaflet](https://leafletjs.com/), [react native modal selector](https://github.com/peacechen/eact-native-modal-selector), [celebrate](https://github.com/arb/celebrate), [multer](https://github.com/expressjs/multer),

##### back-end

Quando clonar o back-end execute os seguintes comandos

Primeiro

> yarn install ou npm install

depois

> yarn knex:migrate ou npm run knex:migrate
para gerar a base de dado com as migrações, que é o sqlite3 ele ja vai estar instalado se foi executado o primeiro comando

> yarn knex:seed ou npm run knex:seed
para gerar o seed de itens ou seja uma lista de itens ja populado na tabele de itens.

Para o app é necessário gerar uma API_KEY do google maps, para isso será preciso esta logado 
na sua conta do google.

## Visão do projeto

Pagina Home
![tela da aplicação web](/ecoleta.png)

Pagina de cadastro
![tela de cadastro](/cadastro.png)
![tela de cadastro](/cadastro1.png)
![tela de cadastro](/cadastro2.png)

Telas do APP
![Tela home app](/apphome.png)
![Tela select uf app](/appuf.png)
![Tela select city app](/appcity.png)
![Tela point app](/apppoint.png)
![Tela detail app](/appdetail.png)

Agradeço a Rocketseat e ao professor Diego Fernandes por proporcionar este conhecimento.