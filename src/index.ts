import { render } from "preact";
import SiteRoot from "./SiteRoot";
import * as dotenv from "dotenv";

dotenv.config();
const renderRoot = document.createElement("div");
document.body.appendChild(renderRoot);
render(SiteRoot(), renderRoot);