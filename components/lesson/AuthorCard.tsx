import { Lesson } from "@/lib/types";
import { LIQUID_GLASS } from "@/lib/constants";

export function AuthorCard({ author }: { author: Lesson["author"] }) {
  return (
    <section className={`rounded-[32px] p-6 ${LIQUID_GLASS}`}>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 text-lg font-heading text-white shadow-inner">
          {author.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h3 className="font-heading text-2xl text-white">{author.name}</h3>
          <p className="text-sm text-indigo-300">{author.role}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-white/60">{author.bio}</p>
      
      <div className="mt-6 flex flex-wrap gap-2">
        {author.socialLinks.map((link) => (
          <a
            key={link.label}
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
