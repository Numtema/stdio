"use client";

import { Resource } from "@/lib/types";
import { ExternalLink, Link as LinkIcon } from "lucide-react";
import { LIQUID_GLASS } from "@/lib/constants";
import { motion, AnimatePresence } from "motion/react";

export function ResourcesSection({ resources }: { resources: Resource[] }) {
  return (
    <section className={`rounded-[32px] p-6 ${LIQUID_GLASS}`}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-2xl text-white">Ressources & Liens</h3>
        <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-white/40">
          Drive, Notion, Docs
        </span>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {resources.length === 0 && (
            <p className="text-sm text-white/40 italic px-2 py-4">Aucune ressource partagée.</p>
          )}
          {resources.map((res) => (
            <motion.a
              key={res.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              href={res.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[20px] border border-white/5 bg-white/[0.01] px-4 py-3.5 transition-colors hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                 <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/50 group-hover:bg-white/10 transition-colors">
                   <LinkIcon className="h-4 w-4" />
                 </div>
                 <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{res.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-white/30 group-hover:text-indigo-300 transition-colors pl-11 sm:pl-0">
                Ouvrir le lien <ExternalLink className="h-3 w-3" />
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
