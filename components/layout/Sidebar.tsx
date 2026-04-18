import { LIQUID_GLASS } from "@/lib/constants";

export function Sidebar({ 
  currentView, 
  onNavigate 
}: { 
  currentView: string; 
  onNavigate: (view: string) => void; 
}) {
  const items = [
    { id: "home", label: "Accueil" },
    { id: "videos", label: "Vidéos" },
    { id: "resources", label: "Ressources" },
    { id: "comments", label: "Commentaires" }
  ];

  return (
    <aside className={`h-fit rounded-[32px] p-4 lg:sticky lg:top-28 ${LIQUID_GLASS}`}>
      <nav className="space-y-1.5 border-b border-white/10 pb-4">
        {items.map((item) => {
          // If view is detail, "videos" item looks active, else exact match
          const active = currentView === item.id || (currentView === "detail" && item.id === "videos");
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={[
                "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                active 
                  ? "border border-white/10 bg-white/[0.06] text-white shadow-sm" 
                  : "border border-transparent bg-transparent text-white/50 hover:bg-white/[0.03] hover:text-white/80",
              ].join(" ")}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-4 rounded-[20px] border border-white/5 bg-black/20 p-4">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/30">Philosophie</p>
        <p className="text-[13px] leading-relaxed text-white/60">
          Moins de bruit, plus de clarté. L&apos;essentiel pour se concentrer, sans détours.
        </p>
      </div>
    </aside>
  );
}
