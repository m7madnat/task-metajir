import { app } from "./server/app.js";
import "./server/db/mongoose.js";

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
