"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Video, Link as LinkIcon, Edit3, Clock, ArrowLeft, Wand2, Loader2 } from "lucide-react";
import { LIQUID_GLASS, LIQUID_GLASS_STRONG } from "@/lib/constants";
import { Resource, Lesson } from "@/lib/types";
import { GoogleGenAI } from "@google/genai";

type PublishFormProps = {
  initialData?: Lesson | null;
  onSave: (data: { title: string; summary: string; youtubeUrl: string; duration: string; resources: Resource[] }) => void;
  onCancel: () => void;
};

export function PublishForm({ initialData, onSave, onCancel }: PublishFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [resources, setResources] = useState<Resource[]>(
    initialData?.resources?.length 
      ? initialData.resources 
      : [{ id: Date.now().toString(), name: "", url: "" }]
  );

  const handleAddResource = () => {
    setResources([...resources, { id: Date.now().toString(), name: "", url: "" }]);
  };

  const handleRemoveResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const updateResource = (id: string, field: 'name' | 'url', value: string) => {
    setResources(resources.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleGenerateAI = async () => {
    if (!title.trim()) {
      alert("Veuillez d'abord saisir un titre pour que l'IA puisse s'en inspirer.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      const prompt = `Agis comme un formateur professionnel. Rédige un court résumé accrocheur (3 ou 4 lignes maximum) d'un module vidéo intitulé "${title}". Le résumé doit expliquer aux apprenants de quoi par le module et pourquoi il est important d'acquérir ces compétences. Ne mets pas de titre, juste le corps du résumé.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      if (response.text) {
        setSummary(response.text.trim());
      }
    } catch (err) {
      console.error("Erreur avec Gemini API:", err);
      alert("La génération IA a échoué. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !youtubeUrl.trim() || !summary.trim()) return;
    
    onSave({
      title,
      summary,
      youtubeUrl,
      duration,
      resources: resources.filter(r => r.name.trim() !== "" && r.url.trim() !== "")
    });
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      onSubmit={handleSubmit}
      className="max-w-4xl space-y-10"
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Revenir
        </button>
      </div>

      <section className={`relative overflow-hidden rounded-[32px] p-8 md:p-12 ${LIQUID_GLASS_STRONG}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(120,119,198,0.1),_transparent_60%)]" />
        
        <div className="relative z-10 space-y-8">
           <h2 className="font-heading text-4xl tracking-tight text-white md:text-5xl">
             {initialData ? "Modifier la vidéo" : "Publier un module"}
           </h2>
           <p className="text-lg text-white/50">
             Configurez la vidéo et liez vos dossiers partagés (Drive, Notion, DropBox) accessibles en un clic.
           </p>

           <div className="space-y-6 pt-4">
             <div className="space-y-2">
               <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                 <Edit3 className="h-4 w-4 text-white/40" /> Titre de la leçon
               </label>
               <input 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 required
                 placeholder="Ex: Architecture de base pour scalabilité"
                 className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
               />
             </div>

             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               <div className="space-y-2">
                 <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                   <Video className="h-4 w-4 text-white/40" /> Lien YouTube
                 </label>
                 <input 
                   value={youtubeUrl}
                   onChange={(e) => setYoutubeUrl(e.target.value)}
                   required
                   placeholder="https://youtu.be/..."
                   className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
                 />
               </div>

               <div className="space-y-2">
                 <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                   <Clock className="h-4 w-4 text-white/40" /> Durée indicative
                 </label>
                 <input 
                   value={duration}
                   onChange={(e) => setDuration(e.target.value)}
                   placeholder="Ex: 12 min"
                   className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
                 />
               </div>
             </div>

             <div className="space-y-2">
               <div className="flex items-center justify-between">
                 <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                   Documentation / Résumé
                 </label>
                 <button 
                   type="button"
                   onClick={handleGenerateAI}
                   disabled={isGenerating || !title.trim()}
                   className="flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 transition-colors hover:bg-indigo-500/20 disabled:opacity-50"
                 >
                   {isGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
                   {isGenerating ? "Génération..." : "Générer avec l'IA"}
                 </button>
               </div>
               <textarea 
                 value={summary}
                 onChange={(e) => setSummary(e.target.value)}
                 required
                 rows={4}
                 placeholder="De quoi parle cette vidéo ? Pourquoi la regarder ?"
                 className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
               />
             </div>
           </div>
        </div>
      </section>

      <section className={`rounded-[32px] p-8 md:p-12 ${LIQUID_GLASS}`}>
         <div className="mb-8 flex items-center justify-between gap-4">
           <div>
             <h3 className="mb-2 font-heading text-3xl text-white">Ressources & Dossiers partagés</h3>
             <p className="text-sm text-white/40">Ajoutez des liens externes cliquables pour le lecteur.</p>
           </div>
           <button 
             type="button"
             onClick={handleAddResource}
             className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
           >
             <Plus className="h-4 w-4" /> Ajouter
           </button>
         </div>

         <div className="space-y-4">
           <AnimatePresence>
             {resources.length === 0 && (
               <p className="py-4 text-center text-sm italic text-white/30">Aucune ressource pour le moment.</p>
             )}
             {resources.map((res) => (
               <motion.div 
                 key={res.id}
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: "auto" }}
                 exit={{ opacity: 0, height: 0 }}
                 className="group flex flex-col items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 md:flex-row md:items-center"
               >
                 <div className="w-full flex-1 space-y-1">
                   <label className="ml-1 text-xs text-white/40">Nom du lien / dossier</label>
                   <input
                     value={res.name}
                     onChange={(e) => updateResource(res.id, 'name', e.target.value)}
                     placeholder="Ex: Dossier Drive, Support Notion..."
                     className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5 disabled:opacity-50"
                   />
                 </div>
                 <div className="w-full flex-[1.5] space-y-1">
                   <label className="ml-1 text-xs text-white/40">URL (https://...)</label>
                   <div className="flex items-center gap-2">
                     <div className="relative flex-1">
                       <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                       <input
                         value={res.url}
                         onChange={(e) => updateResource(res.id, 'url', e.target.value)}
                         placeholder="https://..."
                         className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
                       />
                     </div>
                     <button
                       type="button"
                       onClick={() => handleRemoveResource(res.id)}
                       className="rounded-xl border border-white/5 bg-red-500/10 p-3 text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
                     >
                       <X className="h-5 w-5" />
                     </button>
                   </div>
                 </div>
               </motion.div>
             ))}
           </AnimatePresence>
         </div>
      </section>

      <div className="flex justify-end gap-4 py-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-6 py-3.5 font-medium text-white/60 transition-colors hover:text-white"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={!title || !youtubeUrl || !summary}
          className="rounded-full bg-white px-10 py-3.5 font-semibold text-black transition-transform hover:scale-[0.98] active:scale-[0.95] disabled:opacity-50 disabled:hover:scale-100"
        >
          {initialData ? "Mettre à jour" : "Mettre en ligne"}
        </button>
      </div>
    </motion.form>
  );
}
