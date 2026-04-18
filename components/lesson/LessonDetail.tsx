"use client";

import { motion } from "motion/react";
import { ArrowLeft, Clock } from "lucide-react";
import { Lesson } from "@/lib/types";
import { LIQUID_GLASS } from "@/lib/constants";
import { YouTubeEmbed } from "@/components/video/YouTubeEmbed";
import { CommentsSection } from "@/components/lesson/CommentsSection";
import { ResourcesSection } from "@/components/lesson/ResourcesSection";
import { AuthorCard } from "@/components/lesson/AuthorCard";

export function LessonDetail({
  lesson,
  onBack,
  onAddComment,
}: {
  lesson: Lesson;
  onBack: () => void;
  onAddComment: (lessonId: number, text: string) => void;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <button
            onClick={onBack}
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Retour
          </button>
          <h1 className="font-heading text-4xl leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {lesson.title}
          </h1>
          <div className="mt-4 flex items-center gap-3">
             <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
               <Clock className="h-3.5 w-3.5" /> {lesson.duration}
             </span>
          </div>
        </div>
        
        <div className="flex shrink-0 flex-wrap gap-2 pb-2">
          {lesson.links?.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <YouTubeEmbed url={lesson.youtubeUrl} />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section className={`rounded-[32px] p-6 md:p-8 ${LIQUID_GLASS}`}>
            <h3 className="mb-4 font-heading text-3xl text-white">Descriptif de la vidéo</h3>
            <p className="text-[15px] leading-[1.8] text-white/70 whitespace-pre-wrap">
              {lesson.summary}
            </p>
          </section>

          <CommentsSection
            comments={lesson.comments}
            onAddComment={(text) => onAddComment(lesson.id, text)}
          />
        </div>

        <div className="space-y-8">
          <ResourcesSection resources={lesson.resources || []} />
          <AuthorCard author={lesson.author} />
        </div>
      </div>
    </motion.div>
  );
}
