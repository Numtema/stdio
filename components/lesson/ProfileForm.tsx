"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link as LinkIcon, Plus, X, User, Edit3, ArrowLeft } from "lucide-react";
import { LIQUID_GLASS, LIQUID_GLASS_STRONG } from "@/lib/constants";
import { AuthorProfile } from "@/lib/types";

export function ProfileForm({
  profile,
  onSave,
  onCancel
}: {
  profile: AuthorProfile;
  onSave: (data: AuthorProfile) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [bio, setBio] = useState(profile.bio);
  const [links, setLinks] = useState(profile.socialLinks);

  const handleAddLink = () => setLinks([...links, { label: "", url: "" }]);
  const handleRemoveLink = (idx: number) => setLinks(links.filter((_, i) => i !== idx));
  const updateLink = (idx: number, field: 'label'|'url', val: string) => {
    setLinks(links.map((l, i) => i === idx ? { ...l, [field]: val } : l));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      role,
      bio,
      socialLinks: links.filter(l => l.label.trim() && l.url.trim())
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
             Réglages du Profil
           </h2>
           <p className="text-lg text-white/50">
             Vos informations créateur s&apos;afficheront sur chaque vidéo.
           </p>

           <div className="space-y-6 pt-4">
             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               <div className="space-y-2">
                 <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                   <User className="h-4 w-4 text-white/40" /> Nom
                 </label>
                 <input 
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   required
                   placeholder="Ex: Studio Nümtema"
                   className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
                 />
               </div>

               <div className="space-y-2">
                 <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                   <Edit3 className="h-4 w-4 text-white/40" /> Sous-titre / Rôle
                 </label>
                 <input 
                   value={role}
                   onChange={(e) => setRole(e.target.value)}
                   placeholder="Ex: Expert Architecture"
                   className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
                 />
               </div>
             </div>

             <div className="space-y-2">
               <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                 Bio contextuelle
               </label>
               <textarea 
                 value={bio}
                 onChange={(e) => setBio(e.target.value)}
                 required
                 rows={3}
                 placeholder="Quelques mots sur vous et ce que vous construisez..."
                 className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
               />
             </div>
           </div>
        </div>
      </section>

      <section className={`rounded-[32px] p-8 md:p-12 ${LIQUID_GLASS}`}>
         <div className="mb-8 flex items-center justify-between gap-4">
           <div>
             <h3 className="mb-2 font-heading text-3xl text-white">Réseaux Sociaux</h3>
             <p className="text-sm text-white/40">Liens vers X, YouTube, LinkedIn...</p>
           </div>
           <button 
             type="button"
             onClick={handleAddLink}
             className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
           >
             <Plus className="h-4 w-4" /> Ajouter
           </button>
         </div>

         <div className="space-y-4">
           <AnimatePresence>
             {links.length === 0 && (
               <p className="py-4 text-center text-sm italic text-white/30">Aucun lien ajouté.</p>
             )}
             {links.map((link, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: "auto" }}
                 exit={{ opacity: 0, height: 0 }}
                 className="group flex flex-col items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 md:flex-row md:items-center"
               >
                 <div className="w-full flex-1 space-y-1">
                   <label className="ml-1 text-xs text-white/40">Label</label>
                   <input
                     value={link.label}
                     onChange={(e) => updateLink(idx, 'label', e.target.value)}
                     placeholder="Ex: LinkedIn, Twitter"
                     className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
                   />
                 </div>
                 <div className="w-full flex-[1.5] space-y-1">
                   <label className="ml-1 text-xs text-white/40">URL (https://...)</label>
                   <div className="flex items-center gap-2">
                     <div className="relative flex-1">
                       <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                       <input
                         value={link.url}
                         onChange={(e) => updateLink(idx, 'url', e.target.value)}
                         placeholder="https://..."
                         className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/5"
                       />
                     </div>
                     <button
                       type="button"
                       onClick={() => handleRemoveLink(idx)}
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
          disabled={!name || !bio}
          className="rounded-full bg-white px-10 py-3.5 font-semibold text-black transition-transform hover:scale-[0.98] active:scale-[0.95] disabled:opacity-50 disabled:hover:scale-100"
        >
          Sauvegarder
        </button>
      </div>
    </motion.form>
  );
}
