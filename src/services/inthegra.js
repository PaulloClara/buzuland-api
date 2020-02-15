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
    process.env.TOKEN_VALIDITY = getCurrentGMTDateTimeMore(
      response.data.minutes
    );
  },

  async lines(search) {
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
      response.data.forEach(item => {
        lines.push({
          code: item.CodigoLinha,
          name: item.Denomicao, // MDS
          origin: item.Origem,
          return: item.Retorno,
          circular: item.Circular
        });
      });

    return lines;
  },

  async stops(search) {
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

      data.forEach(item => {
        const address = { name: "", locale: "", others: [] };

        if (item.Endereco)
          item.Endereco.split(", ").forEach((item, index) => {
            if (index === 0) address.name = item;
            else if (item.includes(" - PI") || item.includes(" - MA"))
              address.locale = item;
            else address.others.push(item);
          });

        stops.push({
          code: item.CodigoParada,
          name: item.Denomicao, // MDS
          latitude: item.Lat,
          longitude: item.Long,
          address
        });
      });
    }

    return stops;
  }
};
