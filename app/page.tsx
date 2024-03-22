import { About } from "@/components/About/About";
import { Home } from "@/components/Home/Home";
import { Projects } from "@/components/Projects/Projects";
import { Skills } from "@/components/Skills/Skills";

export default function MainPage() {
  return (
    <main>
      <Home />
      <About />
      <Skills />
      <Projects />
    </main>
  );
}
