import { About } from "@/components/About/About";
import { Home } from "@/components/Home/Home";
import { Experience } from "@/components/Experience/Experience";
import { Skills } from "@/components/Skills/Skills";

export default function MainPage() {
  return (
    <main>
      <Home />
      <About />
      <Skills />
      <Experience />
    </main>
  );
}
