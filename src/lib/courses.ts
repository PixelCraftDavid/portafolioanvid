export type Course = {
  title: string;
  provider: string;
  year: string;
  duration?: string;
  category: "Frontend" | "Backend" | "Móvil" | "Datos" | "Diseño" | "DevOps" | "Otros";
  certificateUrl?: string;
  credentialId?: string;
  description?: string;
};

export const courses: Course[] = [
  {
    title: "Google UX Design",
    provider: "Google",
    year: "2024",
    certificateUrl: "https://drive.google.com/file/d/1V72BmLv5CtDgUd0UPDZ9_fdSpGwgPEdV/view?usp=sharing",
    duration: "40 horas",
    category: "Diseño",
    description: "Diseño UX, prototipado, investigación y experiencia de usuario.",
  },
  {
    title: "Liderazgo para Jóvenes Profesionales",
    provider: "Udemy",
    year: "2024",
    certificateUrl: "https://drive.google.com/file/d/1jO3E1MWEiyU3Y_-iT6vYWCPFAJlnLlFN/view?usp=sharing",
    duration: "3.5 horas",
    category: "Otros",
  },
  {
    title: "Excelencia en Liderazgo",
    provider: "Udemy",
    year: "2024",
    certificateUrl: "https://drive.google.com/file/d/1X4PGHG3-xb8oYnIlJUymOr6m7d5ofxRn/view?usp=sharing",
    duration: "1 hora",
    category: "Otros",
  },
  {
    title: "Crea Tu Bot de Mensajería con Python",
    provider: "Udemy",
    year: "2024",
    certificateUrl: "https://drive.google.com/file/d/1vqxX1-x2-Sta_yZLZJ7B9b7jYhvoUa3K/view?usp=sharing",
    duration: "33 minutos",
    category: "Backend",
  },
];