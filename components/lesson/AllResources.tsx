"use client";

import { Lesson } from "@/lib/types";
import { ExternalLink, Link as LinkIcon } from "lucide-react";
import { LIQUID_GLASS, LIQUID_GLASS_STRONG } from "@/lib/constants";
import { motion } from "motion/react";

export function AllResources({ lessons }: { lessons: Lesson[] }) {
  const allResources = lessons.flatMap(l => 
    (l.resources || []).map(r => ({ ...r, lessonTitle: l.title }))
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
      <section className={`relative overflow-hidden rounded-[32px] p-8 md:p-14 ${LIQUID_GLASS_STRONG}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(120,119,198,0.15),_transparent_50%)]" />
        <div className="relative z-10">
          <h2 className="font-heading text-4xl text-white md:text-5xl tracking-tight mb-4">Bibliothèque de Ressources</h2>
          <p className="text-white/50 text-lg">L&apos;ensemble des documents, dossiers Drive et outils partagés à travers tous vos modules.</p>
        </div>
      </section>
      
      {allResources.length === 0 ? (
         <div className={`p-8 text-center rounded-[32px] ${LIQUID_GLASS}`}>
           <p className="text-white/40 italic">Aucune ressource disponible pour le moment.</p>
         </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {allResources.map((res, i) => (
            <a key={i} href={res.url} target="_blank" rel="noreferrer" className={`group flex flex-col justify-between p-6 rounded-[24px] ${LIQUID_GLASS} transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.04] border border-white/5 hover:border-indigo-500/20`}>
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/50 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 mb-4 transition-colors">
                  <LinkIcon className="h-4 w-4" />
                </div>
                <h3 className="font-heading text-2xl text-white/90 group-hover:text-white line-clamp-1 mb-1">{res.name}</h3>
                <p className="text-sm text-white/40 line-clamp-1">Extrait de : {res.lessonTitle}</p>
              </div>
              <div className="flex justify-end mt-6">
                <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50 group-hover:text-indigo-300 group-hover:bg-indigo-500/10 transition-colors">
                  Ouvrir <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}
