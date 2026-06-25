import axios from "axios";
import { ENV } from "../constants/env";


export const api = axios.create({ baseURL: ENV.API_BASE_URL, timeout: 15_000 });
