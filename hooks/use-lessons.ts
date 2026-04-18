"use client";

import { useState, useEffect } from "react";
import { Lesson, Resource, AuthorProfile } from "@/lib/types";
import { initialLessons, initialProfile } from "@/lib/data";

export function useLessons() {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [profile, setProfile] = useState<AuthorProfile>(initialProfile);
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

      const storedProfile = localStorage.getItem("premium_video_profile");
      if (storedProfile) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProfile(JSON.parse(storedProfile));
      }

    } catch (error) {
      console.error("Failed to load data from storage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("premium_video_lessons", JSON.stringify(lessons));
        localStorage.setItem("premium_video_profile", JSON.stringify(profile));
      } catch (error) {
        console.error("Failed to save data to storage", error);
      }
    }
  }, [lessons, profile, isLoaded]);

  function addComment(lessonId: number, text: string) {
    setLessons((current) =>
      current.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, comments: [text, ...lesson.comments] }
          : lesson
      )
    );
  }

  function deleteComment(lessonId: number, commentIndex: number) {
    setLessons((current) =>
      current.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, comments: lesson.comments.filter((_, idx) => idx !== commentIndex) }
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
      comments: []
    };
    
    setLessons((prev) => [newLesson, ...prev]);
    return newLesson.id;
  }

  function updateLesson(id: number, data: { title: string; summary: string; youtubeUrl: string; duration: string; resources: Resource[] }) {
    setLessons((prev) => prev.map(l => l.id === id ? { ...l, ...data } : l));
  }

  return { lessons, profile, isLoaded, addComment, deleteComment, addLesson, updateLesson, updateProfile: setProfile };
}
