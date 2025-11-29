import { type SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 22s5-3 7-5 4-8 4-8-1-4-4-5-7 1-7 1S2 10 2 10" />
      <path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <path d="M22 22s-5-3-7-5-4-8-4-8" />
    </svg>
  );
}
