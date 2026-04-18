"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Video, Link as LinkIcon, Edit3, Clock, ArrowLeft } from "lucide-react";
import { LIQUID_GLASS, LIQUID_GLASS_STRONG } from "@/lib/constants";
import { Resource } from "@/lib/types";

type PublishFormProps = {
  onSave: (data: { title: string; summary: string; youtubeUrl: string; duration: string; resources: Resource[] }) => void;
  onCancel: () => void;
};

export function PublishForm({ onSave, onCancel }: PublishFormProps) {
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [summary, setSummary] = useState("");
  const [resources, setResources] = useState<Resource[]>([
    { id: Date.now().toString(), name: "", url: "" }
  ]);

  const handleAddResource = () => {
    setResources([...resources, { id: Date.now().toString(), name: "", url: "" }]);
  };

  const handleRemoveResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const updateResource = (id: string, field: 'name' | 'url', value: string) => {
    setResources(resources.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !youtubeUrl.trim() || !summary.trim()) return;
    
    onSave({
      title,
      summary,
      youtubeUrl,
      duration,
      // Filter out empty resources
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

      <section className={`rounded-[32px] p-8 md:p-12 ${LIQUID_GLASS_STRONG} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(120,119,198,0.1),_transparent_60%)]" />
        
        <div className="relative z-10 space-y-8">
           <h2 className="font-heading text-4xl text-white md:text-5xl tracking-tight">
             Publier un module
           </h2>
           <p className="text-white/50 text-lg">
             Configurez la vidéo et liez vos dossiers partagés (Drive, Notion, DropBox) accessibles en un clic.
           </p>

           <div className="space-y-6 pt-4">
             {/* Title */}
             <div className="space-y-2">
               <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                 <Edit3 className="w-4 h-4 text-white/40" /> Titre de la leçon
               </label>
               <input 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 required
                 placeholder="Ex: Architecture de base pour scalabilité"
                 className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
               />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* YouTube Link */}
               <div className="space-y-2">
                 <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                   <Video className="w-4 h-4 text-white/40" /> Lien YouTube
                 </label>
                 <input 
                   value={youtubeUrl}
                   onChange={(e) => setYoutubeUrl(e.target.value)}
                   required
                   placeholder="https://youtu.be/..."
                   className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
                 />
               </div>

                {/* Duration */}
               <div className="space-y-2">
                 <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                   <Clock className="w-4 h-4 text-white/40" /> Durée indicative
                 </label>
                 <input 
                   value={duration}
                   onChange={(e) => setDuration(e.target.value)}
                   placeholder="Ex: 12 min"
                   className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
                 />
               </div>
             </div>

             {/* Summary */}
             <div className="space-y-2">
               <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                 Documentation / Résumé
               </label>
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

      {/* Resources Manager */}
      <section className={`rounded-[32px] p-8 md:p-12 ${LIQUID_GLASS}`}>
         <div className="flex items-center justify-between gap-4 mb-8">
           <div>
             <h3 className="font-heading text-3xl text-white mb-2">Ressources & Dossiers partagés</h3>
             <p className="text-sm text-white/40">Ajoutez des liens externes cliquables pour le lecteur.</p>
           </div>
           <button 
             type="button"
             onClick={handleAddResource}
             className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
           >
             <Plus className="w-4 h-4" /> Ajouter
           </button>
         </div>

         <div className="space-y-4">
           <AnimatePresence>
             {resources.length === 0 && (
               <p className="text-center text-sm text-white/30 py-4 italic">Aucune ressource pour le moment.</p>
             )}
             {resources.map((res) => (
               <motion.div 
                 key={res.id}
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: "auto" }}
                 exit={{ opacity: 0, height: 0 }}
                 className="group flex flex-col md:flex-row items-start md:items-center gap-4 rounded-2xl bg-white/[0.02] border border-white/5 p-4"
               >
                 <div className="flex-1 w-full space-y-1">
                   <label className="text-xs text-white/40 ml-1">Nom du lien / dossier</label>
                   <input
                     value={res.name}
                     onChange={(e) => updateResource(res.id, 'name', e.target.value)}
                     placeholder="Ex: Dossier Drive, Support Notion..."
                     className="w-full disabled:opacity-50 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
                   />
                 </div>
                 <div className="flex-[1.5] w-full space-y-1">
                   <label className="text-xs text-white/40 ml-1">URL (https://...)</label>
                   <div className="flex items-center gap-2">
                     <div className="relative flex-1">
                       <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                       <input
                         value={res.url}
                         onChange={(e) => updateResource(res.id, 'url', e.target.value)}
                         placeholder="https://..."
                         className="w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
                       />
                     </div>
                     <button
                       type="button"
                       onClick={() => handleRemoveResource(res.id)}
                       className="p-3 rounded-xl border border-white/5 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                     >
                       <X className="w-5 h-5" />
                     </button>
                   </div>
                 </div>
               </motion.div>
             ))}
           </AnimatePresence>
         </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end gap-4 py-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-6 py-3.5 font-medium text-white/60 hover:text-white transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={!title || !youtubeUrl || !summary}
          className="rounded-full bg-white px-10 py-3.5 font-semibold text-black transition-transform hover:scale-[0.98] active:scale-[0.95] disabled:opacity-50 disabled:hover:scale-100"
        >
          Mettre en ligne
        </button>
      </div>
    </motion.form>
  );
}
