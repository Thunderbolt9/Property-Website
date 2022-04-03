import axios from "axios";
import ContactedProperty from "../components/properties/ContactedProperty";
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
    formData.append("al1", data.al1);
    formData.append("al2", data.al2);
    formData.append("city", data.city);
    formData.append("zipcode", data.zipcode);
    formData.append("type", data.type);
    formData.append("uploadedImages", data.fileOne);
    formData.append("uploadedImages", data.fileTwo);
    formData.append("uploadedImages", data.fileThree);
    formData.append("carea", data.carea);
    formData.append("barea", data.barea);
    formData.append("price", data.price);
    formData.append("description", data.description);
    return formData;
  } catch (err) {
    console.log(err);
  }
}

const exportedFunctions = {
  //create new property
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

  // get all proporties
  async getProperties() {
    try {
      const res = await instance.get(
        `${API_URL}/property`,
        headers.jsonHeaders
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  // get specific propety by id
  async getPropertyById(id) {
    try {
      const res = await instance.post(
        `${API_URL}/property/getPropertyById`,
        { id: id },
        headers.jsonHeaders
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  // update property deatils
  async updateProperty(payload, id) {
    try {
      console.log("update property");
      const formData = await getFormData(payload);
      formData.append("id", id);
      const res = await instance.post(
        `${API_URL}/property/update`,
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

  // get images from the server
  async getImages(imageArray, type) {
    try {
      const images = await Promise.all(
        imageArray.map(async (image) => {
          const imageObj = await instance.get(
            `http://localhost:4000/${image}`,
            { responseType: "blob" },
            headers.jsonHeaders
          );
          if (type === "file") {
            return new File([imageObj.data], "image.jpeg");
          } else {
            return URL.createObjectURL(imageObj.data);
          }
        })
      );
      console.log(images);
      return images;
    } catch (err) {
      console.log(err);
    }
  },

  //delete property
  async deleteProperty(id) {
    try {
      const res = await instance.post(
        `${API_URL}/property/remove`,
        { id: id },
        headers.jsonHeaders
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  //get all users
  async getAllUsers() {
    try {
      const res = await instance.get(
        `${API_URL}/admin/allUsers`,
        headers.jsonHeaders
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  //getUserById
  async getUserById(id) {
    try {
      const res = await instance.post(
        `${API_URL}/user/getUserById`,
        {
          id: id,
        },
        headers.jsonHeaders
      );

      return res.data.user;
    } catch (err) {
      console.log(err);
    }
  },

  async contactProperty(propertyId) {
    try {
      const res = await instance.post(
        `${API_URL}/property/contact`,
        {
          id: propertyId,
        },
        headers.jsonHeaders
      );
      console.log("contacted property", res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  async getContactersInfo(contactorArray) {
    try {
      const data = await Promise.all(
        contactorArray.map(async (item) => {
          return await exportedFunctions.getUserById(item);
        })
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  },
};

export default exportedFunctions;
