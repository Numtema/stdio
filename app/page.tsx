"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { LessonList } from "@/components/lesson/LessonList";
import { LessonDetail } from "@/components/lesson/LessonDetail";
import { PublishForm } from "@/components/lesson/PublishForm";
import { AllResources } from "@/components/lesson/AllResources";
import { AllComments } from "@/components/lesson/AllComments";
import { useLessons } from "@/hooks/use-lessons";

type ViewState = "home" | "detail" | "publish" | "videos" | "resources" | "comments";

export default function Platform() {
  const { lessons, isLoaded, addComment, addLesson } = useLessons();
  const [route, setRoute] = useState<ViewState>("home");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === selectedId) ?? null,
    [lessons, selectedId],
  );

  // Derive logical view to render taking selections into account
  const viewToRender = 
    route === "detail" ? "detail" : 
    route === "publish" ? "publish" : 
    route === "resources" ? "resources" : 
    route === "comments" ? "comments" : 
    "home";

  return (
    <div className="font-body min-h-screen selection:bg-indigo-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-20 bg-[#030303]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.05),_transparent_80%)]" />

      <TopNavbar onPublish={() => {
        setSelectedId(null);
        setRoute("publish");
      }} />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <Sidebar
          currentView={viewToRender === "home" ? "home" : viewToRender}
          onNavigate={(v) => {
            if (v === "home" || v === "videos") {
              setRoute("home");
              setSelectedId(null);
            } else {
              setRoute(v as ViewState);
              setSelectedId(null);
            }
          }}
        />

        <main className="min-w-0">
          <AnimatePresence mode="wait">
            {!isLoaded ? (
               <div key="loader" className="flex items-center justify-center pt-24 text-white/20">
                 <div className="h-2 w-2 animate-ping rounded-full bg-white/40" />
               </div>
            ) : viewToRender === "publish" ? (
              <PublishForm 
                key="publish" 
                onSave={(data) => {
                   const newId = addLesson(data);
                   setSelectedId(newId);
                   setRoute("detail");
                }} 
                onCancel={() => setRoute("home")} 
              />
            ) : viewToRender === "detail" && selectedLesson ? (
              <LessonDetail
                key="detail"
                lesson={selectedLesson}
                onBack={() => setRoute("home")}
                onAddComment={addComment}
              />
            ) : viewToRender === "resources" ? (
              <AllResources key="resources" lessons={lessons} />
            ) : viewToRender === "comments" ? (
              <AllComments key="comments" lessons={lessons} />
            ) : (
              <LessonList 
                key="list" 
                lessons={lessons} 
                onSelect={(id) => {
                  setSelectedId(id);
                  setRoute("detail");
                }} 
                onPublish={() => setRoute("publish")}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
