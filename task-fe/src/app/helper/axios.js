import Axios from "axios";
import { config } from "./config";

const axios = Axios.create({
    baseURL: config.baseUrl,
    headers: {
        Accept: "application/json",
    },
});

export default axios;
