export type Project = {
  slug: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  stack: { category: string; items: string[] }[];
  challenges: { title: string; description: string }[];
  results: string[];
  tags: string[];
  year: string;
  image: string;
  github?: string;
  demo?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "coparmex",
    title: "Coparmex",
    description:
      "Reemplacé un proceso manual de validación de descuentos por un sistema QR escaneable en segundos. Backend PHP+MySQL con panel administrativo para gestionar la red de aliados.",
    problem:
      "Coparmex gestionaba descuentos exclusivos para sus socios comerciales mediante un proceso 100% manual: tarjetas físicas, listas en papel y validación sin sistema central. Esto generaba fraudes por suplantación, imposibilidad de auditar uso y mala experiencia para socios.",
    solution:
      "Diseñé y construí una plataforma web donde cada socio accede a su panel personal, genera códigos QR temporales por beneficio y el comerciante valida el QR escaneándolo en segundos. Incluye gestión de descuentos por categoría, panel de validación para comercios y reportes de uso para administradores.",
    stack: [
      { category: "Backend", items: ["PHP", "Arquitectura MVC"] },
      { category: "Base de datos", items: ["MySQL", "Índices optimizados"] },
      { category: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
      {
        category: "Seguridad",
        items: ["Validación QR server-side", "Roles y permisos"],
      },
    ],
    challenges: [
      {
        title: "Validación QR en tiempo real con expiración",
        description:
          "Los códigos expiran para prevenir reuso. Implementé timestamps y tokens únicos por transacción para garantizar que cada QR sea de un solo uso.",
      },
      {
        title: "Concurrencia en la validación",
        description:
          "Múltiples comercios escaneando QR simultáneamente requería queries eficientes. Optimicé índices de MySQL y usé transacciones para evitar condiciones de carrera.",
      },
      {
        title: "Sistema de permisos con 4 roles",
        description:
          "Super admin, admin, comercio y socio, cada uno con accesos distintos. Construí un middleware PHP para validar permisos por endpoint sin framework.",
      },
      {
        title: "Arquitectura desde cero sin framework",
        description:
          "Construí el ciclo completo HTTP → router → controlador → modelo → view para tener control total sobre performance y seguridad.",
      },
    ],
    results: [
      "Validación de descuentos en segundos vía QR",
      "4 roles de usuario con permisos diferenciados",
      "Panel administrativo con reportes de uso",
      "Eliminación del fraude por suplantación",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "QR", "Sistema de roles"],
    year: "2024",
    image: "/images/projects/coparmex.webp",
    github: "https://github.com/PixelCraftDavid/Coparmex",
    featured: true,
  },
  {
    slug: "asesoria-legal",
    title: "Asesoría Legal en Línea",
    description:
      "App Android que digitaliza la asesoría legal: pagos con Mercado Pago, chatbot de WhatsApp, autenticación segura y backend PHP+MySQL.",
    problem:
      "Los despachos legales en México operaban 100% presencial. Los clientes tenían que ir físicamente para consultas básicas, sin canal digital ni pagos online.",
    solution:
      "Diseñé y desarrollé una app híbrida que digitaliza el flujo completo: registro con autenticación, catálogo de abogados, pagos in-app, chat en tiempo real, notificaciones por WhatsApp y panel administrativo.",
    stack: [
      {
        category: "Frontend móvil",
        items: ["Cordova", "HTML", "CSS", "JavaScript"],
      },
      { category: "Backend", items: ["PHP", "API REST"] },
      { category: "Base de datos", items: ["MySQL"] },
      {
        category: "Integraciones",
        items: ["Mercado Pago", "WhatsApp Business API", "Chatbot"],
      },
      { category: "Plataforma", items: ["Android"] },
    ],
    challenges: [
      {
        title: "Integración de pagos con Mercado Pago",
        description:
          "Implementé webhooks para validar transacciones asíncronas y sincronizar estados de pago con el backend.",
      },
      {
        title: "Comunicación en tiempo real sin WebSockets",
        description:
          "Cordova no soporta WebSockets sin plugins nativos. Usé polling optimizado con caché para mantener el chat fluido.",
      },
      {
        title: "Autenticación segura",
        description:
          "Sesiones con tokens de expiración, recuperación de contraseña vía email y validación server-side en cada endpoint.",
      },
    ],
    results: [
      "App publicada en Android",
      "Flujo completo de pagos in-app",
      "Chatbot para FAQ automatizado",
      "Notificaciones automáticas por WhatsApp",
    ],
    tags: ["Cordova", "PHP", "MySQL", "Mercado Pago", "Android"],
    year: "2024",
    image: "/images/projects/asesorlegal.jpeg",
    github: "https://github.com/PixelCraftDavid/Asesor-Legal-en-Linea",
    featured: true,
  },
  {
    slug: "uta-acapulco",
    title: "Universidad Tecnológica de Acapulco",
    description:
      "Rediseño integral del portal universitario con enfoque mobile-first. Optimicé la carga de contenidos y la usabilidad del apartado de docentes, mejorando la experiencia en todos los dispositivos.",
    problem:
      "El portal universitario de la UTA tenía un diseño antiguo, no era responsivo y la navegación en móvil era deficiente. El apartado de docentes era especialmente complejo y poco usable, lo que dificultaba el acceso a información académica para estudiantes y profesores.",
    solution:
      "Rediseñé el portal completo con enfoque mobile-first, aplicando diseño responsivo en todas las vistas. Optimicé la carga de contenidos con técnicas de lazy loading y compresión de assets, y reestructuré la arquitectura del apartado de docentes para hacerla más intuitiva.",
    stack: [
      { category: "Backend", items: ["PHP"] },
      { category: "Base de datos", items: ["MySQL"] },
      { category: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
      { category: "Diseño", items: ["Mobile-first", "Responsive design"] },
    ],
    challenges: [
      {
        title: "Migrar sin romper contenido existente",
        description:
          "El portal ya tenía contenido dinámico en producción. Reestructuré las vistas manteniendo las rutas originales para no romper enlaces externos ni SEO existente.",
      },
      {
        title: "Optimización en conexiones lentas",
        description:
          "Muchos estudiantes accedían desde redes móviles de baja velocidad. Implementé lazy loading de imágenes y reduje el peso de los assets para mejorar los tiempos de carga.",
      },
      {
        title: "Reestructura de la sección docentes",
        description:
          "El apartado de docentes era el más complejo y desorganizado. Reorganicé la jerarquía de información y simplifiqué la navegación para reducir clics necesarios.",
      },
    ],
    results: [
      "Portal completamente responsivo (móvil, tablet, desktop)",
      "Mejora en tiempos de carga de contenidos",
      "Navegación simplificada en el apartado de docentes",
      "Experiencia consistente en todos los dispositivos",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Responsive"],
    year: "2024",
    image: "/images/projects/uta-acapulco.png",
    demo: "https://www.utacapulco.edu.mx/UTANUEVA4/Inicio.php",
    featured: true,
  },
];