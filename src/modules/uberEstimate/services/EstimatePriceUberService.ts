import { getPricesUber } from "../../../assets/ubeAPI";

export class EstimatePriceUberService {
  getPrices = async (
    pickUpLat: string,
    pickUpLong: string,
    dropLat: string,
    dropLong: string
  ) => {
    const request = await getPricesUber({
      pickUpLat,
      pickUpLong,
      dropLat,
      dropLong,
    });

    let prices: Array<string> = [];

    await request.json().then((json) => {
      let fares: any;

      if (json.data.fareEstimate) {
        fares = json.data.fareEstimate.fares;
      } else {
        return "Something's wrong";
      }

      for (const key in fares) {
        if (Object.prototype.hasOwnProperty.call(fares, key)) {
          const element = fares[key];
          if (key == "20022263" || key ==  "20041757") {
            prices.push(`😃 Comfort: ${element.fare}`);
          } else if (key == "11047") {
            prices.push(`😄   UberX: ${element.fare}`);
          } else if (key == "20004791") {
            prices.push(`😁     VIP: ${element.fare}`);
          } else if (key == "20034909") {
            prices.push(`😁    Moto: ${element.fare}`);
          }else if (key == "20042669") {
            prices.push(`😁   Black: ${element.fare}`);
          }
        }
      }
    });

    return prices;
  };
}
