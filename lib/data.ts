import { Lesson } from "./types";

export const initialLessons: Lesson[] = [
  {
    id: 1,
    title: "Créer un système simple qui tient dans le temps",
    summary:
      "Dans cette vidéo, l’auteur explique la logique générale du module, les objectifs et comment suivre le parcours sans se disperser. Le but est d’aller droit à l’essentiel avec un cadre clair, des étapes concrètes et des supports faciles à récupérer.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "18 min",
    resources: [
      { id: "1a", name: "Dossier Drive : Modèles & templates", url: "https://drive.google.com" },
      { id: "1b", name: "Notes partagées (Notion)", url: "https://notion.so" },
    ],
    links: [
      { label: "Voir sur YouTube", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { label: "Newsletter", url: "https://example.com/newsletter" },
    ],
    comments: [
      "Très clair. J’aime le côté simple et direct.",
      "Le Drive partagé aide bien à suivre la vidéo.",
    ],
    author: {
      name: "Nümtema Studio",
      role: "Auteur du module",
      bio: "Création de parcours vidéo simples, lisibles et utiles, avec documents à télécharger et commentaires ouverts.",
      socialLinks: [
        { label: "YouTube", url: "https://www.youtube.com/" },
        { label: "Instagram", url: "https://www.instagram.com/" },
      ],
    },
  },
  {
    id: 2,
    title: "Organiser ses étapes d’action",
    summary:
      "Une méthode simple pour structurer ses actions, garder un fil logique et éviter de s’éparpiller. La vidéo est accompagnée de ressources pour appliquer immédiatement ce qui est montré.",
    youtubeUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    duration: "26 min",
    resources: [
      { id: "2a", name: "Fichier Figma de présentation", url: "https://figma.com" },
    ],
    links: [
      { label: "Voir sur YouTube", url: "https://www.youtube.com/watch?v=ysz5S6PUM-U" },
      { label: "Twitter / X", url: "https://x.com/" },
    ],
    comments: [
      "La structure est propre.",
      "J’aimerais un exemple supplémentaire pour la partie 2.",
    ],
    author: {
      name: "Nümtema Studio",
      role: "Auteur du module",
      bio: "Des vidéos pensées pour être comprises vite, appliquées vite, et enrichies par une petite base documentaire utile.",
      socialLinks: [
        { label: "YouTube", url: "https://www.youtube.com/" },
        { label: "LinkedIn", url: "https://www.linkedin.com/" },
      ],
    },
  },
];
