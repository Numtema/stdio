import { AuthorProfile } from "@/lib/types";
import { LIQUID_GLASS } from "@/lib/constants";
import { Edit2 } from "lucide-react";

export function AuthorCard({ author, onEditProfile }: { author: AuthorProfile; onEditProfile?: () => void }) {
  return (
    <section className={`relative rounded-[32px] p-6 ${LIQUID_GLASS}`}>
      {onEditProfile && (
        <button 
          onClick={onEditProfile}
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          title="Modifier le profil"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      )}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 text-lg font-heading text-white shadow-inner">
          {author.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="mr-8">
          <h3 className="font-heading text-2xl text-white">{author.name}</h3>
          <p className="text-sm text-indigo-300">{author.role}</p>
        </div>
      </div>
      <p className="text-[15px] leading-relaxed text-white/60">{author.bio}</p>
      
      <div className="mt-6 flex flex-wrap gap-2">
        {author.socialLinks.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
