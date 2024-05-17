export type ColorKey = "primary" | "background" | "border" | "text";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonScheme = "primary" | "normal" | "like";
export type LayoutWidth = "large" | "medium" | "small";

interface Theme {
  color: Record<ColorKey, string>;
  button: {
    [key in ButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonScheme: {
    [key in ButtonScheme]: {
      color: string;
      backgroundColor: string;
    };
  };
  borderRadius: {
    default: string;
  };
  layout: {
    width: {
      [key in LayoutWidth]: string;
    };
  };
}
export const theme: Theme = {
  color: {
    primary: "#121254",
    background: "aliceblue",
    border: "lightgrey",
    text: "black",
  },
  button: {
    large: {
      fontSize: "2rem",
      padding: "1rem 2rem",
    },
    medium: {
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    small: {
      fontSize: "0.75rem",
      padding: "0.25rem 0.5rem",
    },
  },
  buttonScheme: {
    primary: {
      color: "white",
      backgroundColor: "midnightblue",
    },
    normal: {
      color: "black",
      backgroundColor: "lightgray",
    },
    like: {
      color: "white",
      backgroundColor: "aliceblue",
    },
  },
  borderRadius: {
    default: "10px",
  },
  layout: {
    width: {
      large: "1020px",
      medium: "760px",
      small: "320px",
    },
  },
};

export function randomColor(dayIndex: number) {
  const colors = [
    "#f8d7da",
    "#fbeee6",
    "#fff5cc",
    "#f1f7e9",
    "#e6f3ff",
    "#e0ebf5",
    "#f5e6ff",
  ];
  return colors[dayIndex];
}
