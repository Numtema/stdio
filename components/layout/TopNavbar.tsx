import { Search } from "lucide-react";
import { LIQUID_GLASS } from "@/lib/constants";

export function TopNavbar({ onPublish }: { onPublish: () => void }) {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 pb-2 md:px-8">
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[28px] px-6 py-4 transition-all ${LIQUID_GLASS}`}>
        <div>
          <p className="mb-0.5 text-xs uppercase tracking-[0.2em] text-indigo-400/80">Studio</p>
          <h1 className="font-heading text-2xl tracking-normal text-white">Plateforme Vidéo</h1>
        </div>
        <div className="hidden max-w-md flex-1 items-center gap-3 rounded-full border border-white/10 bg-black/20 px-5 py-2.5 text-white/50 transition-colors focus-within:border-indigo-500/50 focus-within:text-white/80 md:flex">
          <Search className="h-4 w-4" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full bg-transparent text-sm placeholder:text-white/40 outline-none"
          />
        </div>
        <button 
          onClick={onPublish}
          className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[0.98] active:scale-[0.95]"
        >
          Publier
        </button>
      </div>
    </header>
  );
}
