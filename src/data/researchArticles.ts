export type ResearchArticleBlock =
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'heading';
      text: string;
    }
  | {
      type: 'quote';
      text: string;
      attribution: string;
    };

export type ResearchArticle = {
  id: number;
  category: string;
  date: string;
  title: string;
  description: string;
  subtitle: string;
  author: string;
  role: string;
  readTime: string;
  coverImage: string;
  coverImageAlt: string;
  content: ResearchArticleBlock[];
};

export const researchArticles: ResearchArticle[] = [
  {
    id: 1,
    category: 'Product',
    date: 'Jan 23, 2026',
    title: 'Introducing Scene Gen',
    description:
      'Generate photorealistic stage designs in seconds with our new Scene Gen model and iterate on composition before build week.',
    subtitle:
      'A walkthrough of the new Scene Gen release, how teams are using it in production, and what changes in pre-production workflows.',
    author: 'Sarah Chen',
    role: 'Head of Product, Theatre AI',
    readTime: '6 min read',
    coverImage:
      'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'A theatre stage lit in dramatic red light before a performance',
    content: [
      {
        type: 'paragraph',
        text: 'Scene Gen was built for rehearsal speed. Directors can now explore full set options with lighting and sightline context in minutes, then share those options with design and production teams from a single workspace.',
      },
      {
        type: 'heading',
        text: 'Built for Practical Production Work',
      },
      {
        type: 'paragraph',
        text: 'The model does not stop at image generation. It accounts for stage dimensions, actor movement zones, and known material constraints so outputs can move directly into technical planning.',
      },
      {
        type: 'quote',
        text: 'The fastest path from concept to confidence is now a single afternoon.',
        attribution: 'Sarah Chen',
      },
      {
        type: 'paragraph',
        text: 'Studios using Scene Gen in beta reduced concept sign-off time by 38% and produced fewer late-stage revisions after technical rehearsals began.',
      },
    ],
  },
  {
    id: 2,
    category: 'Research',
    date: 'Dec 21, 2025',
    title: 'State of AI in Theatre 2026',
    description:
      'A comprehensive look at how generative models are transforming set design, costuming, and script analysis in modern theatre.',
    subtitle:
      'A practical report on adoption trends, what is working in production, and where creative teams still need stronger tooling and governance.',
    author: 'Marcus Cole',
    role: 'Staff Researcher, Theatre AI',
    readTime: '8 min read',
    coverImage:
      'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'A packed audience seated in a modern theatre hall',
    content: [
      {
        type: 'paragraph',
        text: 'The intersection of artificial intelligence and theatrical performance reached a major inflection point in 2026. Experimental pilots have shifted into repeatable production systems for design, planning, and iterative creative review.',
      },
      {
        type: 'heading',
        text: 'Generative Set Design Is Maturing',
      },
      {
        type: 'paragraph',
        text: 'Directors and set teams now use real-time scene generation to validate lighting states and blocking plans before physical build begins. Teams using Theatre AI workflows reduced design cycle time by about 40% in early deployments.',
      },
      {
        type: 'heading',
        text: 'Consent and Likeness Standards Are Non-Negotiable',
      },
      {
        type: 'paragraph',
        text: 'As tooling improves, rights and permission systems become core infrastructure. Our Consent Matrix allows performers to define permitted uses of voice and likeness in granular terms, making policy enforceable in day-to-day workflows.',
      },
      {
        type: 'quote',
        text: 'The tool is not replacing the artist. It gives the artist a new brush.',
        attribution: 'Sarah Chen, Lead Scenographer',
      },
      {
        type: 'paragraph',
        text: 'The next phase is hybrid performance: live actors working with responsive, model-driven environments that adapt to tone, movement, and timing without sacrificing artistic control.',
      },
    ],
  },
  {
    id: 3,
    category: 'Engineering',
    date: 'Dec 8, 2025',
    title: 'Our Model Architecture',
    description:
      'A deep dive into the custom transformer models and rendering pipeline powering real-time creative exploration.',
    subtitle:
      'How our inference stack, retrieval layer, and rendering systems are tuned for reliability under live production constraints.',
    author: 'Alex Rivera',
    role: 'Engineering Lead, Theatre AI',
    readTime: '9 min read',
    coverImage:
      'https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'Stage lighting rig with beams cutting through haze',
    content: [
      {
        type: 'paragraph',
        text: 'Our architecture combines transformer-based scene understanding with a constrained generation layer tuned for stage layouts. The system prioritizes predictable outputs over novelty so teams can trust repeated runs.',
      },
      {
        type: 'heading',
        text: 'Latency Targets for Live Creative Sessions',
      },
      {
        type: 'paragraph',
        text: 'We optimized the pipeline for collaborative sessions where teams expect feedback in seconds. Caching and retrieval strategies reduce repeated compute while preserving context continuity.',
      },
      {
        type: 'quote',
        text: 'Fast output is useful only when it is stable enough to build on.',
        attribution: 'Alex Rivera',
      },
      {
        type: 'paragraph',
        text: 'The rendering layer stays modular, so experiments can ship quickly without destabilizing production workflows used by partner studios.',
      },
    ],
  },
  {
    id: 4,
    category: 'Community',
    date: 'Dec 1, 2025',
    title: 'Theatre AI User Showcase',
    description:
      'Highlights from teams using Theatre AI in rehearsal rooms, design studios, and production planning.',
    subtitle:
      'Stories from productions that used Theatre AI to accelerate planning while improving cross-team communication.',
    author: 'Jessica Wu',
    role: 'Community Lead, Theatre AI',
    readTime: '5 min read',
    coverImage:
      'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'Theatre performers on stage in front of dramatic red curtains',
    content: [
      {
        type: 'paragraph',
        text: 'This season, we saw teams adopt Theatre AI across very different production styles, from intimate black-box shows to large commercial stages. The strongest pattern was faster alignment between creative and technical departments.',
      },
      {
        type: 'heading',
        text: 'Shared Context in Rehearsals',
      },
      {
        type: 'paragraph',
        text: 'When everyone works from the same visual and rights-aware source of truth, iteration becomes cleaner and less expensive. Teams reported fewer late surprises during technical runs.',
      },
      {
        type: 'quote',
        text: 'The biggest win was everyone making decisions from the same page.',
        attribution: 'Production Manager, user interview',
      },
      {
        type: 'paragraph',
        text: 'We are expanding these case studies with more detailed workflows so new teams can adopt proven patterns instead of starting from scratch.',
      },
    ],
  },
];

export function getResearchArticleById(id: number): ResearchArticle | undefined {
  return researchArticles.find((article) => article.id === id);
}

export function getRelatedResearchArticles(
  currentId: number,
  count = 2
): ResearchArticle[] {
  return researchArticles.filter((article) => article.id !== currentId).slice(0, count);
}
