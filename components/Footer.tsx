"use client";

export const Footer = () => {
  return (
    <footer className="fixed w-full flex flex-row justify-center items-center h-12 text-base bottom-0 px-5 md:px-10 bg-white dark:bg-black dark:text-white">
      <p className="text-center">
        © {new Date().getFullYear()} Cristian Arando
      </p>
    </footer>
  );
};
