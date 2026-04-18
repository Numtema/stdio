import { LIQUID_GLASS, LIQUID_GLASS_STRONG } from "@/lib/constants";
import { extractYouTubeId } from "@/lib/youtube";

export function YouTubeEmbed({ url }: { url: string }) {
  const id = extractYouTubeId(url);

  if (!id) {
    return (
      <div className={`flex h-64 w-full items-center justify-center rounded-[32px] md:h-[500px] ${LIQUID_GLASS}`}>
        <p className="text-white/40">Lien YouTube invalide</p>
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden rounded-[32px] p-2 ${LIQUID_GLASS_STRONG}`}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(120,119,198,0.2),_transparent_70%)] opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
      <div className="relative overflow-hidden rounded-[24px] border border-white/5 bg-[#030303] shadow-2xl">
        <iframe
          className="h-64 w-full md:h-[500px]"
          src={`https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
