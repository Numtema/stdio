"use client";

import { useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LIQUID_GLASS } from "@/lib/constants";

export function CommentsSection({ comments, onAddComment, onDeleteComment }: { comments: string[]; onAddComment: (text: string) => void; onDeleteComment?: (index: number) => void }) {
  const [draft, setDraft] = useState("");

  return (
    <section className={`rounded-[32px] p-6 ${LIQUID_GLASS}`}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-2xl text-white">Commentaires publics</h3>
        <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-white/40">
          Ouvert à tous
        </span>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Une remarque, une question ?"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-indigo-500/50 focus:bg-white/5 focus:ring-1 focus:ring-indigo-500/50"
        />
        <button
          onClick={() => {
            const trimmed = draft.trim();
            if (!trimmed) return;
            onAddComment(trimmed);
            setDraft("");
          }}
          className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[0.98] active:scale-[0.95]"
        >
          <MessageSquare className="h-4 w-4" /> Publier
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={`${comment}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, height: 0, margin: 0 }}
              className="group relative rounded-[20px] border border-white/5 bg-white/[0.01] p-4 text-sm leading-relaxed text-white/70"
            >
               <div className="pr-8">{comment}</div>
               {onDeleteComment && (
                 <button
                   onClick={() => onDeleteComment(index)}
                   className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
                   title="Supprimer"
                 >
                   <Trash2 className="h-4 w-4" />
                 </button>
               )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
