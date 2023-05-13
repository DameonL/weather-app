import SiteRoot from "./Components/SiteRoot";
import { createRoot } from "react-dom/client";
import React from "react";

const renderRoot = document.createElement("div");
document.body.appendChild(renderRoot);
const root = createRoot(renderRoot);
root.render(SiteRoot());
