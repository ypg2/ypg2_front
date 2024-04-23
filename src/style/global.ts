import { createGlobalStyle } from "styled-components";
import "sanitize.css";

export const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        background-color: white;
    }
    h1{
        margin: 0;
    }

    *{
        color: black;
    }
`;
