# BuzuLand-API

BuzuLand-API tem como objetivo abstrair a API Inthegra e fornecer mais recursos através de novas tecnologias.

### Tech

Como ninguém reinventa a roda, essa API usa várias tecnologias para funcionar corretamente, eis algumas delas:

- [ApolloServer] - Framework leve voltado ao Graphql.
- [Graphql] - Implementação de referência JavaScript para GraphQL.
- [Axios] - Cliente HTTP baseado em promise para Node.
- [Moment] - Manipulador de data e hora.
- [Dotenv] - Gerenciador de variáveis de ambiente.
- [Node] - Ferramenta de magia negra.

### Instalação

Clone o repositório, instale as dependências e inicie o servidor.

```sh
$ git clone https://github.com/paulloclara/buzuland-api
$ cd buzuland-api
$ yarn -i
# configure o arquivo .env
$ yarn dev
```

### Playground

```graphql
query {
  busLine {
    code
    name
  }
}
```

```graphql
query {
  busLine(search: ["0201", "0202", "0204"]) {
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
  busStop(search: ["SANTA MARIA", "0202"]) {
    code
    name
    latitude
    longitude
  }
}
```

```graphql
query {
  busLocation {
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

#### Links

[API BuzuLand](https://api-buzuland.herokuapp.com) |
[API Inthegra](https://inthegra.strans.teresina.pi.gov.br)

#### Licença

MIT

<!-- Refs -->

[apolloserver]: https://apollographql.com
[graphql]: https://graphql.org
[axios]: https://github.com/axios/axios
[moment]: https://momentjs.com
[dotenv]: https://github.com/motdotla/dotenv
[node]: https://nodejs.org/en
