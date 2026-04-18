"use client";

import { motion } from "motion/react";
import { Play, Clock, Link as LinkIcon, MessageSquare, Plus } from "lucide-react";
import { Lesson } from "@/lib/types";
import { LIQUID_GLASS, LIQUID_GLASS_STRONG } from "@/lib/constants";

export function LessonList({ 
  lessons, 
  onSelect, 
  onPublish 
}: { 
  lessons: Lesson[]; 
  onSelect: (id: number) => void;
  onPublish: () => void;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-10"
    >
      <section className={`relative overflow-hidden rounded-[32px] p-8 md:p-14 ${LIQUID_GLASS_STRONG}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(120,119,198,0.15),_transparent_50%)]" />

        <div className="relative z-10 max-w-3xl">
          <div className="mb-6 inline-flex animate-pulse items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Plateforme d&apos;apprentissage
          </div>
          <h2 className="font-heading text-4xl tracking-tight text-white md:text-6xl">
            L&apos;essentiel, sans le bruit.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/50">
            Intégrez vos vidéos YouTube, documentez vos leçons et connectez vos dossiers Drive extérieurs. Une expérience centrée sur la fluidité d&apos;apprentissage.
          </p>
        </div>
      </section>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        animate="show"
        className="grid gap-6 xl:grid-cols-2"
      >
        <motion.button
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          onClick={onPublish}
          className="group flex flex-col items-center justify-center gap-4 rounded-[32px] border border-indigo-500/20 bg-indigo-500/[0.05] p-8 text-center shadow-inner transition-all duration-500 hover:scale-[1.01] hover:bg-indigo-500/10"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 transition-transform duration-300 group-hover:scale-110">
            <Plus className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-heading text-2xl text-indigo-300">Ajouter une Leçon</h3>
            <p className="mt-2 text-sm text-indigo-400/60">Configurez une nouvelle vidéo YouTube et ses liens</p>
          </div>
        </motion.button>
        
        {lessons.map((lesson) => (
          <motion.button
            key={lesson.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            onClick={() => onSelect(lesson.id)}
            className={`group flex flex-col items-start gap-4 rounded-[32px] p-5 text-left transition-all duration-500 hover:scale-[1.01] hover:bg-white/[0.04] ${LIQUID_GLASS}`}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-white/5 bg-[#050505]">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent_60%)] transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-xl backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/20">
                    <Play className="ml-1 h-6 w-6 fill-white" />
                  </div>
               </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-white/70">
                <Clock className="h-3.5 w-3.5" /> {lesson.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-white/70">
                <LinkIcon className="h-3.5 w-3.5" /> {lesson.resources?.length || 0} liens
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-white/70">
                <MessageSquare className="h-3.5 w-3.5" /> {lesson.comments?.length || 0}
              </span>
            </div>

            <div className="mt-2 flex flex-grow flex-col space-y-2">
              <h3 className="font-heading text-2xl text-white/90 transition-colors group-hover:text-white">
                {lesson.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-white/50">
                {lesson.summary}
              </p>
            </div>

            <div className="mt-4 flex w-full items-center justify-between border-t border-white/5 pt-4">
              <span className="text-sm font-medium text-white/50">{lesson.author.name}</span>
              <span className="text-sm font-medium text-indigo-300 transition-colors group-hover:text-indigo-200">
                Voir le détail →
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
