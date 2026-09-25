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
  slug: "ixmiplace",
  title: "IxmiPlace — Plataforma Inmobiliaria Serverless",
  description:
    "Desarrollé una plataforma inmobiliaria web progresiva (PWA) para publicar, explorar y administrar propiedades. Implementé autenticación, moderación de anuncios, búsqueda con filtros, mapas interactivos, gestión de imágenes y control de acceso mediante Firebase Security Rules.",

  problem:
    "La publicación y búsqueda de propiedades en la zona se realizaba principalmente mediante redes sociales y grupos locales, donde la información podía estar dispersa, desactualizada y sin una estructura uniforme. El proyecto buscó centralizar las publicaciones en una plataforma orientada a propiedades de Ixmiquilpan, facilitando su búsqueda, ubicación y administración.",

  solution:
    "Diseñé y desarrollé una SPA/PWA con React y TypeScript, utilizando Firebase como infraestructura serverless. Firestore gestiona las publicaciones y datos de la aplicación, Firebase Authentication administra las cuentas de usuario y los roles, mientras que Cloudinary se utiliza para almacenar y entregar las imágenes. Incorporé Leaflet y OpenStreetMap para representar las propiedades geográficamente y desarrollé un flujo de moderación para revisar las publicaciones antes de hacerlas públicas. Presté especial atención a la consistencia de los datos y a la resiliencia frente a fallos transitorios de red, dado que la aplicación depende de listeners en tiempo real y de reglas de seguridad declarativas evaluadas en el servidor.",

  stack: [
    {
      category: "Frontend",
      items: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "React Router"
      ]
    },
    {
      category: "Backend & Base de datos",
      items: [
        "Firebase Firestore",
        "Firebase Authentication"
      ]
    },
    {
      category: "Mapas",
      items: [
        "Leaflet",
        "OpenStreetMap"
      ]
    },
    {
      category: "Imágenes",
      items: [
        "Cloudinary",
        "Cloudinary CDN"
      ]
    },
    {
      category: "Seguridad",
      items: [
        "Firestore Security Rules",
        "Control de acceso por roles",
        "Validación de datos"
      ]
    },
    {
      category: "Deployment",
      items: [
        "Vercel",
        "PWA"
      ]
    }
  ],

  challenges: [
    {
      title: "Arquitectura serverless con autorización declarativa",
      description:
        "Construí la aplicación sin mantener un servidor backend tradicional, delegando la autorización y las restricciones de acceso a Firestore Security Rules. Diseñé reglas capaces de autorizar actualizaciones parciales muy específicas — por ejemplo, permitir que un usuario incremente un contador de vistas o reportes sin poder tocar ningún otro campo de la publicación — usando request.resource.data.diff().affectedKeys() para restringir con precisión qué se puede modificar en cada tipo de operación."
    },
    {
      title: "Consistencia de favoritos ante escrituras concurrentes",
      description:
        "El sistema de favoritos necesitaba mantener sincronizado, en tiempo real, un contador de popularidad en cada publicación con las acciones individuales de cada usuario. Agrupé la escritura del favorito y la actualización del contador en un writeBatch, usando increment() para que el servidor aplicara el cambio directamente sin depender de una lectura previa, y diseñé la regla de seguridad para que solo aceptara modificar ese campo en incrementos de exactamente uno, evitando manipulación directa del contador desde el cliente."
    },
    {
      title: "Depuración de reglas de seguridad y tipos de datos",
      description:
        "Diagnostiqué un fallo donde una consulta pública, que no debía depender del estado de autenticación, empezaba a fallar por completo para todos los usuarios. La causa era un solo documento cuyo campo de expiración había cambiado de tipo numérico a Timestamp al editarlo manualmente desde la consola de Firebase — y Firestore invalida toda la consulta si no puede evaluar la regla de seguridad sobre cualquiera de los documentos candidatos. Corregí el dato y reforcé la regla para verificar el tipo antes de comparar."
    },
    {
      title: "Resiliencia de listeners en tiempo real",
      description:
        "Identifiqué que los listeners de Firestore (onSnapshot) podían recibir errores de permisos transitorios durante la reconexión del canal de comunicación, especialmente al iniciar sesión o en cargas en frío desde dispositivos móviles. Implementé una capa de reintento con backoff progresivo y recreación controlada del listener, en lugar de dejar que la interfaz quedara vacía de forma permanente tras un fallo puntual del SDK."
    },
    {
      title: "Moderación, gestión de imágenes y experiencia PWA",
      description:
        "Diseñé un flujo de estados para que los administradores revisen, aprueben o rechacen publicaciones antes de su exposición pública. Integré Cloudinary para recibir y entregar las fotografías, manteniendo en Firestore únicamente las referencias necesarias, y convertí la aplicación en una Progressive Web App para permitir su instalación en dispositivos móviles con una única base de código."
    }
  ],

  results: [
    "Aplicación web progresiva (PWA) desplegada y accesible desde dispositivos móviles y de escritorio",
    "Autenticación mediante correo electrónico y Google",
    "Sistema de publicaciones con revisión y moderación administrativa",
    "Sistema de favoritos con actualización consistente del contador mediante escrituras agrupadas e increment()",
    "Control de acceso granular implementado mediante Firebase Security Rules a nivel de campo",
    "Listeners en tiempo real con reintento automático ante fallos transitorios de conexión",
    "Búsqueda y filtrado por categoría, operación, fecha y precio",
    "Mapa interactivo para visualizar la ubicación de las propiedades",
    "Gestión de fotografías mediante Cloudinary",
    "Arquitectura serverless sin necesidad de mantener un servidor backend tradicional"
  ],

  tags: [
    "React",
    "TypeScript",
    "Firebase",
    "Firestore",
    "Cloudinary",
    "Leaflet",
    "PWA",
    "Vercel"
  ],

  year: "2026",

  image: "/images/projects/ixmiplace.png",

  github: "https://github.com/PixelCraftDavid/ixmiplace",

  demo: "https://ixmiplace.vercel.app/",

  featured: true,
},

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