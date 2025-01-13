import * as React from "react";

// By: lucide
// See: https://v0.app/icon/lucide/indian-rupee
// Example: <IconLucideIndianRupee width="24px" height="24px" style={{color: "#000000"}} />

export const IconLucideIndianRupee = ({
  height = "1em",
  strokeWidth = "2",
  fill = "none",
  focusable = "false",
  ...props
})=> (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <path
      fill={fill}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3m0 0c6.667 0 6.667-10 0-10"
    />
  </svg>
);
