const baseUrl =
  "https://my-json-server.typicode.com/SamJHudson01/se_project_react";

export const getItems = () => {
  return fetch(`${baseUrl}/items`)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
