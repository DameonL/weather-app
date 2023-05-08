import { render } from "preact";
import SiteRoot from "./SiteRoot";

const renderRoot = document.createElement("div");
document.body.appendChild(renderRoot);
render(SiteRoot(), renderRoot);