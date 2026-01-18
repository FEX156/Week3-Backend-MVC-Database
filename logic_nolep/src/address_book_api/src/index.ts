import { web } from "./applications/web";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.APP_PORT || 3030;

web.listen(port, () => {
  console.log(`Succes running aplication: http://localhost:${port}`);
});
