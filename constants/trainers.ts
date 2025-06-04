interface Trainer {
  id: string;
  image: string;
  name: {
    en: string;
    sr: string;
  };
  role: {
    en: string;
    sr: string;
  };
  bio: {
    en: string;
    sr: string;
  };
};

export const trainers: Trainer[] = [
  {
    id: "1",
    image: "/biljana_zivkovic.webp",
    name: {
      en: "Biljana Zivkovic",
      sr: "Biljana Zivkovic",
    },
    role: {
      en: "Lead Pilates Instructor",
      sr: "Glavna instruktorka pilatesa",
    },
    bio: {
      en: "Biljana has been teaching Pilates for over 10 years and is certified in mat Pilates. She specializes in using equipment to enhance the traditional Pilates experience for all fitness levels.",
      sr: "Biljana predaje pilates više od 10 godina i sertifikovana je za mat pilates. Specijalizovana je za korišćenje opreme kako bi poboljšala tradicionalno pilates iskustvo za sve nivoe kondicije.",
    },
  },
  {
    id: "2",
    image: "/aleksandra_sikirica.webp",
    name: {
      en: "Aleksandra Sikirica",
      sr: "Aleksandra Sikirica",
    },
    role: {
      en: "Pilates & Aerobic Instructor",
      sr: "Instruktorka pilatesa i aerobika",
    },
    bio: {
      en: "Aleksandra brings her background in dance and physical therapy to create dynamic and mindful Pilates sequences that focus on building core strength and flexibility.",
      sr: "Aleksandra koristi svoje iskustvo iz plesa i fizikalne terapije kako bi kreirala dinamične i promišljene pilates vežbe koje jačaju trup i povećavaju fleksibilnost.",
    },
  },
  {
    id: "3",
    image: "/aleksandra_pavic.webp",
    name: {
      en: "Andjela Pavic",
      sr: "Andjela Pavic",
    },
    role: {
      en: "Pilates & Aerobic Instructor",
      sr: "Instruktorka pilatesa i aerobika",
    },
    bio: {
      en: "Andjela is our Pilates expert with extensive knowledge in using equipment for traditional Pilates.",
      sr: "Andjela je naša pilates instruktorka sa bogatim znanjem o korišćenju opreme za tradicionalni pilates.",
    },
  },
  {
    id: "4",
    image: "/bojana_milic.webp",
    name: {
      en: "Bojana Milic",
      sr: "Bojana Milic",
    },
    role: {
      en: "Pilates & Aerobic Instructor",
      sr: "Instruktorka pilatesa i aerobika",
    },
    bio: {
      en: "Bojana is our Pilates instructor with experience for all fitness levels.",
      sr: "Bojana je naša pilates instruktorka sa iskustvom za sve nivoe kondicije.",
    },
  },
];
