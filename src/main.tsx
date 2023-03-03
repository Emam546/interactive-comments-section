import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { UserProvider } from "./context/user";
import {DeleteFormProvider} from "./deleteForm";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <DeleteFormProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </DeleteFormProvider>
    </React.StrictMode>
);
