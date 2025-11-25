import { Footer, Header } from "../componenti-sito/theme";

export default function LayoutSito({ children }) {
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="bg-neutral-100 text-foreground">
        {children}
      </main>
      <Footer />
    </div>
  );
}