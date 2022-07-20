import fetch from "isomorphic-fetch";
import { API } from "../config";
import cookie from "js-cookie";

export const create = (tag, token) => {
  return fetch(`${API}/tag`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tag),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getTags = () => {
  return fetch(`${API}/tags`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getTag = (slug) => {
  return fetch(`${API}/tag/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const removeTag = (slug, token) => {
  return fetch(`${API}/tag/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json({
        message: "Item has been deleted",
      });
    })
    .catch((error) => console.log(error));
};
