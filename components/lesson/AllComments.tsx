"use client";

import { Lesson } from "@/lib/types";
import { MessageSquare, Trash2 } from "lucide-react";
import { LIQUID_GLASS, LIQUID_GLASS_STRONG } from "@/lib/constants";
import { motion, AnimatePresence } from "motion/react";

export function AllComments({ lessons, onDeleteComment }: { lessons: Lesson[], onDeleteComment: (lessonId: number, commentIndex: number) => void }) {
  const allComments = lessons.flatMap(l => 
    (l.comments || []).map((c, i) => ({ text: c, lessonTitle: l.title, lessonId: l.id, commentIndex: i }))
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
      <section className={`relative overflow-hidden rounded-[32px] p-8 md:p-14 ${LIQUID_GLASS_STRONG}`}>
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(120,119,198,0.1),_transparent_50%)]" />
         <div className="relative z-10">
           <h2 className="font-heading text-4xl text-white md:text-5xl tracking-tight mb-4">Discussions Publiques</h2>
           <p className="text-white/50 text-lg">Le flux complet des échanges et questions sur l&apos;ensemble de vos leçons.</p>
         </div>
      </section>
      
      {allComments.length === 0 ? (
         <div className={`p-8 text-center rounded-[32px] ${LIQUID_GLASS}`}>
           <p className="text-white/40 italic">Aucun commentaire pour le moment.</p>
         </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {allComments.map((c) => (
              <motion.div 
                key={`${c.lessonId}-${c.commentIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, height: 0, margin: 0 }}
                className={`group p-6 rounded-[24px] ${LIQUID_GLASS} border border-white/5 flex gap-4 items-start relative`}
              >
                <div className="h-10 w-10 shrink-0 bg-white/5 text-white/40 rounded-full flex items-center justify-center mt-1">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/40 mb-2">Sur : <span className="text-white/70 italic">{c.lessonTitle}</span></p>
                  <p className="text-[15px] leading-relaxed text-white/90">{c.text}</p>
                </div>
                <button
                  onClick={() => onDeleteComment(c.lessonId, c.commentIndex)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
                  title="Supprimer ce commentaire"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
