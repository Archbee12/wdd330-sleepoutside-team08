const baseURL = import.meta.env.VITE_SERVER_URL;

if (!baseURL) {
  console.error("❌ VITE_SERVER_URL is not defined!");
}

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw {
      name: "servicesError",
      message: "jsonResponse"
    }
  };
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category = null) {  

    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    // console.log(data.Result);
    return data.Result;
  }

  async searchProducts(query) {
    const response = await fetch(`${baseURL}products/search/${query}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(order) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    };

    return await fetch(`${baseURL}checkout/`, options).then(convertToJson); // success
  }


}