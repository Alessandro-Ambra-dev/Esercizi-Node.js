import { error } from "node:console";
import * as fs from "node:fs";
let data = "Hello, this is a written txt file using fs";

fs.writeFile("callback.txt", data, { encoding: "utf-8" }, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("File written with success");
    console.log(`The file has the following content: ${data}`);
  }
});
