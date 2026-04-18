"use client";

import { useState, useEffect } from "react";
import { Lesson, Resource } from "@/lib/types";
import { initialLessons } from "@/lib/data";

export function useLessons() {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("premium_video_lessons");
      if (stored) {
        const parsed = JSON.parse(stored);
        const migrated = parsed.map((lesson: any) => ({
          ...lesson,
          resources: lesson.resources || lesson.files?.map((f: string, i: number) => ({ id: `legacy-${i}`, name: f, url: "#" })) || [],
          comments: lesson.comments || [],
          links: lesson.links || []
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLessons(migrated);
      }
    } catch (error) {
      console.error("Failed to load lessons from storage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("premium_video_lessons", JSON.stringify(lessons));
      } catch (error) {
        console.error("Failed to save lessons to storage", error);
      }
    }
  }, [lessons, isLoaded]);

  function addComment(lessonId: number, text: string) {
    setLessons((current) =>
      current.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, comments: [text, ...lesson.comments] }
          : lesson
      )
    );
  }

  function addLesson(data: { title: string; summary: string; youtubeUrl: string; duration: string; resources: Resource[] }) {
    const newLesson: Lesson = {
      id: Date.now(),
      title: data.title,
      summary: data.summary,
      youtubeUrl: data.youtubeUrl,
      duration: data.duration || "Non spécifié",
      resources: data.resources,
      links: [],
      comments: [],
      author: {
        name: "Auteur",
        role: "Éditeur du module",
        bio: "Partage de connaissances et méthodes via cette plateforme.",
        socialLinks: []
      }
    };
    
    setLessons((prev) => [newLesson, ...prev]);
    return newLesson.id;
  }

  return { lessons, isLoaded, addComment, addLesson };
}
