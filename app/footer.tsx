import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center">
      Copyright &copy; {currentYear} Matt Convente
    </footer>
  )
};
