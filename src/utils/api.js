const baseUrl =
  "https://my-json-server.typicode.com/SamJHudson01/se_project_react";

// "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
};

export const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};
