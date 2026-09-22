export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  image: string;
  github?: string;
  demo?: string;
  featured: boolean;
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "coparmex",
    title: "Coparmex",
    description:
      "Plataforma web integral para la gestión de beneficios exclusivos de Coparmex, con validación mediante códigos QR y gestión dinámica de descuentos para socios comerciales.",
    longDescription:
      "Desarrollo de una plataforma web integral para la gestión de beneficios exclusivos de Coparmex. Implementé un sistema de validación mediante códigos QR y gestión dinámica de descuentos, optimizado para socios comerciales. Desarrollado con una arquitectura robusta basada en PHP, MySQL, JavaScript, HTML y CSS, garantizando seguridad, escalabilidad y una experiencia de usuario eficiente para la red de aliados de la organización.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    year: "2024",
    image: "/images/projects/coparmex.webp",
    github: "https://github.com/PixelCraftDavid/Coparmex",
    featured: true,
    highlights: [
      "Sistema de validación mediante códigos QR",
      "Gestión dinámica de descuentos para socios comerciales",
      "Arquitectura escalable basada en PHP y MySQL",
      "Experiencia optimizada para la red de aliados",
    ],
  },
  {
    slug: "asesoria-legal",
    title: "Asesoría Legal en Línea",
    description:
      "Aplicación híbrida desarrollada con Apache Cordova, PHP, JavaScript y MySQL para brindar orientación legal de manera rápida e intuitiva.",
    longDescription:
      "Aplicación híbrida desarrollada con Apache Cordova, PHP, JavaScript y MySQL para brindar orientación legal de manera rápida e intuitiva. El proyecto combina el alcance de una app móvil nativa con la flexibilidad de tecnologías web, ofreciendo una experiencia fluida para el usuario.",
    tags: ["Cordova", "PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    year: "2024",
    image: "/images/projects/asesorlegal.jpeg",
    github: "https://github.com/PixelCraftDavid/Asesor-Legal-en-Linea",
    featured: true,
    highlights: [
      "App híbrida multiplataforma con Apache Cordova",
      "Backend en PHP con base de datos MySQL",
      "Interfaz intuitiva para orientación legal",
      "Diseño responsive mobile-first",
    ],
  },
  {
    slug: "uta-acapulco",
    title: "Universidad Tecnológica de Acapulco",
    description:
      "Rediseño y optimización integral del portal universitario, con enfoque mobile-first, diseño responsivo y mejora de usabilidad en el apartado de docentes.",
    longDescription:
      "Rediseño y optimización integral del portal universitario, implementando un enfoque mobile-first y diseño responsivo para garantizar una navegación intuitiva en cualquier dispositivo. Desarrollo enfocado en la mejora de la usabilidad y la eficiencia en la carga de contenidos y en el apartado de docentes.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    year: "2024",
    image: "/images/projects/uta-acapulco.png",
    demo: "https://www.utacapulco.edu.mx/UTANUEVA4/Inicio.php",
    featured: true,
    highlights: [
      "Rediseño completo del portal universitario",
      "Enfoque mobile-first y diseño responsivo",
      "Optimización de carga de contenidos",
      "Mejora de usabilidad en el apartado de docentes",
    ],
  },
];