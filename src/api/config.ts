import axios from "axios";
import md5 from "md5";

const defaultInstance = axios.create({
  baseURL: "https://gateway.marvel.com:443/v1/public",
});

defaultInstance.interceptors.request.use((request) => {
  const timestamp = new Date().getTime();
  const privateKey = "0893dc32252d5926e88bead2e169bb32c47e8a7a";
  const publicKey = "c74c2e9d85fa953aa98601674874660c";

  const hash = md5(`${timestamp}${privateKey}${publicKey}`);
  request.params = {
    ...request.params,
    ts: timestamp,
    apikey: publicKey,
    hash,
  };

  return request;
});

export default defaultInstance;
