import { createContext } from "react";
import { saveFile } from "../saveload.js";

const SaveFileContext = createContext(saveFile);

export default SaveFileContext;
