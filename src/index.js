import React from 'react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);



root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
