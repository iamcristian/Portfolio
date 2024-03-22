import React from 'react'
import { MdPersonSearch } from 'react-icons/md';

export const About = () => {
  return (
    <section
      className="section-page flex flex-col justify-start"
      id="about"
    >
      <h2 className="mb-4">
        <MdPersonSearch size={"1.5rem"} className="inline-block" /> About
      </h2>
      {/** Add your content here */}
    </section>
  );
}
