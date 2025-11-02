import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/app/componenti/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
      <div className="max-w-3xl text-center space-y-10">
        <h1 className="text-6xl font-semibold"> Next.js Dark Mode Tutorial</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Aperiam sed, facilis ipsam voluptatum optio voluptates dolor harum fugiat
          fuga voluptatibus expedita voluptatem at officia unde aut odio,
          nam obcaecati suscipit?
        </p>
        <div className="space-x-2">
          <Button href="/gestionale">GESTIONALE</Button>
          <Button variant='secondary'>Button 2</Button>
          <ThemeToggle/>
        </div>
      </div>
    </div>
  );
}
