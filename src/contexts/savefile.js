import { createContext } from "react";
import { savefile } from "../saveload.js";

const SavefileContext = createContext(savefile);

export default SavefileContext;
