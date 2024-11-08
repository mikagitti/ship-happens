import { CSSProperties } from "react";
import styled from "styled-components";

export const settingsBannerStyle: CSSProperties = {
     display: "flex",
     justifyContent: "center",
     flexDirection: "column",
     gap: "1rem",
};

export const HeadingStyle = styled.h1`
     font-size: 4rem;

     @media (max-width: 768px) {
          font-size: 2rem;
     }
`;

export const labelStyle = {
     fontSize: "1.5rem",
};

export const selectStyle = {
     fontSize: "1.5rem",
     margin: "0.3rem 0.5rem",
     width: "50px",
};

export const comboBoxGridStyle = {
     display: "grid",
     gridTemplateColumns: "150px 1fr 1fr",
     alignItems: "center",
     gap: "1rem",
};
