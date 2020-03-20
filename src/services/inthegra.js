const {
  checkValidity,
  getCurrentGMTDateTime,
  getCurrentGMTDateTimeMore
} = require("../utils/date");

const http = require("./axios")({
  baseURL: process.env.INTHEGRA_URL,
  headers: {
    "Accept-Language": "en",
    "X-Api-Key": process.env.API_KEY
  }
});

module.exports = {
  async auth() {
    if (process.env.TOKEN && checkValidity(process.env.TOKEN_VALIDITY)) return;

    const response = await http.post(
      "/signin",
      {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
      },
      {
        headers: {
          Date: getCurrentGMTDateTime(),
          "Content-Type": "application/json"
        }
      }
    );

    process.env.TOKEN = response.data.token;
    process.env.TOKEN_VALIDITY = getCurrentGMTDateTimeMore(9);
  },

  async line(search) {
    await this.auth();

    const route = search ? `/linhas?busca=${search}` : "/linhas";
    const response = await http.get(route, {
      headers: {
        Date: getCurrentGMTDateTime(),
        "X-Auth-Token": process.env.TOKEN
      }
    });

    const lines = [];

    if (response.status === 200)
      response.data.forEach(line => {
        lines.push({
          code: line.CodigoLinha,
          name: line.Denomicao,
          origin: line.Origem,
          return: line.Retorno,
          circular: line.Circular
        });
      });

    return lines;
  },

  async stop(search) {
    await this.auth();

    const route = !search
      ? "/paradas"
      : isNaN(Number(search))
      ? `/paradas?busca=${search}`
      : `/paradasLinha?busca=${search}`;
    const response = await http.get(route, {
      headers: {
        Date: getCurrentGMTDateTime(),
        "X-Auth-Token": process.env.TOKEN
      }
    });

    const stops = [];

    if (response.status === 200) {
      const data = response.data.Paradas || response.data;

      data.forEach(stop => {
        const address = { name: "", locale: "", others: [] };

        if (stop.Lat && stop.Long) {
          if (stop.Endereco)
            stop.Endereco.split(", ").forEach((item, index) => {
              if (index === 0) address.name = item;
              else if (item.includes(" - PI") || item.includes(" - MA"))
                address.locale = item;
              else address.others.push(item);
            });

          stops.push({
            code: stop.CodigoParada,
            name: stop.Denomicao,
            latitude: stop.Lat,
            longitude: stop.Long,
            address
          });
        }
      });
    }

    return stops;
  },

  async location(search) {
    await this.auth();

    const route = "/veiculos";
    const response = await http.get(route, {
      headers: {
        Date: getCurrentGMTDateTime(),
        "X-Auth-Token": process.env.TOKEN
      }
    });

    const locations = [];

    if (response.status === 200)
      response.data.forEach(({ Linha: location }) => {
        // problems in "/veiculosLinha?busca=<lineCode>"
        if (!search || location.CodigoLinha == search) {
          const buses = [];

          location.Veiculos.forEach(bus => {
            buses.push({
              code: bus.CodigoVeiculo,
              latitude: bus.Lat,
              longitude: bus.Long,
              time: bus.Hora
            });
          });

          locations.push({
            code: location.CodigoLinha,
            name: location.Denomicao,
            origin: location.Origem,
            return: location.Retorno,
            circular: location.Circular,
            buses
          });
        }
      });

    return locations;
  }
};
