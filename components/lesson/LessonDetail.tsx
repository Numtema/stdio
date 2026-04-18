"use client";

import { motion } from "motion/react";
import { ArrowLeft, Edit2 } from "lucide-react";
import { Lesson, AuthorProfile } from "@/lib/types";
import { YouTubeEmbed } from "@/components/video/YouTubeEmbed";
import { AuthorCard } from "./AuthorCard";
import { CommentsSection } from "./CommentsSection";
import { ResourcesSection } from "./ResourcesSection";

export function LessonDetail({
  lesson,
  profile,
  onBack,
  onEditLesson,
  onAddComment,
  onDeleteComment
}: {
  lesson: Lesson;
  profile: AuthorProfile;
  onBack: () => void;
  onEditLesson: () => void;
  onAddComment: (id: number, text: string) => void;
  onDeleteComment: (id: number, index: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mx-auto max-w-4xl pb-16"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour
        </button>
        <button
          onClick={onEditLesson}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Edit2 className="h-4 w-4" />
          Éditer ce module
        </button>
      </div>

      <YouTubeEmbed url={lesson.youtubeUrl} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <div>
            <h1 className="font-heading text-4xl text-white md:text-5xl">
              {lesson.title}
            </h1>
            <div className="mt-6 whitespace-pre-wrap text-[17px] leading-relaxed text-white/70">
              {lesson.summary}
            </div>
          </div>

          <CommentsSection
            comments={lesson.comments}
            onAddComment={(text) => onAddComment(lesson.id, text)}
            onDeleteComment={(index) => onDeleteComment(lesson.id, index)}
          />
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 pb-2">
          {lesson.links?.map((link) => (
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

        <div className="space-y-8">
          <ResourcesSection resources={lesson.resources || []} />
          <AuthorCard author={profile} />
        </div>
      </div>
    </motion.div>
  );
}
