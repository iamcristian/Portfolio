"use client";

import Image from "next/image";
import { GrDownload, GrLinkedin, GrMail } from "react-icons/gr";
import { ReactTyped } from "react-typed";

export const Home = () => {
  return (
    <section
      className="section-page flex flex-col justify-center pt-32 pb-0 h-[70vh] font-medium md:justify-center"
      id="home"
    >
      <div className="flex gap-4 mb-4 items-center">
        <Image
          className="rounded-xl shadow-lg size-16"
          src="/me.webp"
          alt="Cristian Arando"
          width={50}
          height={50}
        />
        <p className="text-sm lg:text-lg">Hello! 👋, I am</p>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold tracking-tight dark:text-white">
        Cristian Arando
      </h1>
      <ReactTyped
        className="text-base font-semibold"
        strings={["Software Developer"]}
        typeSpeed={100}
        backDelay={5000}
        loop
      />
      <p className="font-light my-5 w-[60%]">
        <strong className="text-sky-700 font-semibold dark:text-sky-500">
          Estudiante de Ingenieria de Sistemas y Desarrollador de Software
        </strong>{" "}
        de Cochabamba, Bolivia. Especializado en el desarrollo de aplicaciones
        web.
      </p>

      <div className="flex gap-5">
        <button className="flex items-center gap-2 text-xs rounded-lg border border-black dark:border-white p-2 dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800">
          <GrMail size={20} />
          Contact me
        </button>
        <button className="flex items-center gap-2 text-xs rounded-lg border p-2 border-black dark:border-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800">
          <GrLinkedin size={20} />
          Linkedin
        </button>
        <button className="flex items-center gap-2 text-xs rounded-lg border p-2 bg-slate-900 hover:bg-slate-700 text-white dark:bg-sky-700 dark:hover:bg-sky-600 border-black dark:border-solid">
          <GrDownload size={20} />
          Download CV
        </button>
      </div>
    </section>
  );
};
