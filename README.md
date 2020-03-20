# BuzuLand-API

BuzuLand-API tem como objetivo abstrair a API Inthegra e fornecer mais recursos através de novas tecnologias.

### Tech

Como ninguém reinventa a roda, essa API usa várias tecnologias para funcionar corretamente, eis algumas delas:

- ApolloServer - Framework leve voltado ao Graphql.
- Graphql - Implementação de referência JavaScript para GraphQL.
- Axios - Cliente HTTP baseado em promise para Node.
- Moment - Manipulador de data e hora.
- Dotenv - Gerenciador de variáveis de ambiente.
- Node - Ferramenta de magia negra.

### Instalação

Clone o repositório, instale as dependências e inicie o servidor.

```sh
$ git clone https://github.com/paulloclara/buzuland-api
$ cd buzuland-api
$ yarn -i
# configure the .env file
$ yarn dev
```

### Playground

```graphql
query {
  lines {
    code
    name
  }
}
```

```graphql
query {
  lines(search: "0204") {
    code
    name
    origin
    return
    circular
  }
}
```

```graphql
query {
  stops {
    code
    name
  }
}
```

```graphql
query {
  busLines {
    code
    name
    buses {
      code
      latitude
      longitude
    }
  }
}
```

### Insomnia

`Preferences > Data > Import Data > From File > insomnia.json`

---

### Links

[API BuzuLand](https://api-buzuland.herokuapp.com) |
[API Inthegra](https://inthegra.strans.teresina.pi.gov.br)

### Licença

MIT
