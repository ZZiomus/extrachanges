import axios from "axios";

export const base_url = `https://still-beach-19546.herokuapp.com`;

export const client = axios.create({ baseURL: base_url });
