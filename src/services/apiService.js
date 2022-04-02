import axios from "axios";
import { API_URL } from "../config";

const instance = axios.create({
  withCredentials: true,
});

const headers = {
  formHeader: {
    "content-type": "multipart/form-data",
  },
  jsonHeaders: {
    "content-type": "application/json",
  },
};

//function to create form data
async function getFormData(data) {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("al1", data.address_line_one);
    formData.append("al2", data.address_line_two);
    formData.append("city", data.city);
    formData.append("zipcode", data.zipcode);
    formData.append("type", data.apartmentType);
    formData.append("uploadedImages", data.fileOne);
    formData.append("uploadedImages", data.fileTwo);
    formData.append("uploadedImages", data.fileThree);
    formData.append("carea", data.carpetArea);
    formData.append("barea", data.buildupArea);
    formData.append("price", data.price);
    formData.append("description", data.description);
    return formData;
  } catch (err) {
    console.log(err);
  }
}

const exportedFunctions = {
  //function to create resource
  async createProperty(payload) {
    try {
      const formData = await getFormData(payload);
      const res = await instance.post(
        `${API_URL}/property/create`,
        formData,
        headers.formHeader
      );
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) {
        let errorRes = err.response.data;
        throw new Error(errorRes.error || errorRes.message);
      } else {
        console.log(err);
        throw new Error("Something went wrong!");
      }
    }
  },

  async updateProperty() {},

  async deleteProperty() {},
};

export default exportedFunctions;
