import { About } from "@/components/About/About";
import { Home } from "@/components/Home/Home";
import { Experience } from "@/components/Experience/Experience";
import { Skills } from "@/components/Skills/Skills";
import { Projects } from "@/components/Projects/Projects";

export default function MainPage() {
  return (
    <main>
      <Home />
      <hr style={{ borderColor: "rgb(47 47 47)" }} />
      <About />
      <hr style={{ borderColor: "rgb(47 47 47)" }} />
      <Skills />
      <hr style={{ borderColor: "rgb(47 47 47)" }} />
      <Experience />
      <hr style={{ borderColor: "rgb(47 47 47)" }} />
      <Projects />
    </main>
  );
}
