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
  /** If set, clicking the card opens this URL in a new tab instead of navigating to the article page */
  externalUrl?: string;
};

export const researchArticles: ResearchArticle[] = [
  {
    id: 5,
    category: 'Policy',
    date: 'Jun 27, 2025',
    title: 'Denmark Seeks to Give People Copyright to Their Own Features in Effort to Combat AI Deepfakes',
    description:
      'Denmark is considering legislation that would grant citizens copyright control over their own image, facial features, and voice to prevent unauthorized AI-generated deepfakes.',
    subtitle: '',
    author: 'Solcyré Burga',
    role: 'TIME',
    readTime: '5 min read',
    coverImage:
      'https://api.time.com/wp-content/uploads/2025/06/GettyImages-2215742772.jpg',
    coverImageAlt: 'Denmark AI deepfakes copyright legislation',
    content: [],
    externalUrl: 'https://time.com/7298425/ai-deepfakes-denmark-copyright-amendment/',
  },
  {
    id: 6,
    category: 'Policy',
    date: 'Nov 7, 2024',
    title: 'What is the ELVIS Act? AI Likeness Law Explained',
    description:
      "Tennessee's ELVIS Act is groundbreaking legislation protecting individuals from unauthorized AI-generated likenesses, including deepfakes and voice clones.",
    subtitle: '',
    author: 'Emily Winks',
    role: 'Atlan',
    readTime: '8 min read',
    coverImage:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'Legal scales representing the ELVIS Act AI likeness law',
    content: [],
    externalUrl: 'https://atlan.com/know/data-governance/elvis-ai-act/',
  },
  {
    id: 7,
    category: 'Policy',
    date: 'Jan 10, 2025',
    title: 'The NO FAKES Act: Protecting Americans from Unauthorized AI-Generated Replicas',
    description:
      'The NO FAKES Act establishes a federal right for individuals to control AI-generated digital replicas of their voice and likeness, with clear enforcement mechanisms.',
    subtitle: '',
    author: 'U.S. Senate',
    role: 'Congress',
    readTime: '3 min read',
    coverImage:
      'https://images.unsplash.com/photo-1589262804704-c5aa9e6def89?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'U.S. Capitol building representing the NO FAKES Act legislation',
    content: [],
    externalUrl: 'https://www.coons.senate.gov/wp-content/uploads/media/doc/no_fakes_act_one-pager.pdf',
  },
  {
    id: 8,
    category: 'Research',
    date: 'Oct 16, 2025',
    title: 'Generative AI, Copyright and Personality Rights: A Comparative Legal Perspective',
    description:
      'This paper examines how courts and policymakers address the intersection of generative AI, copyright protection, and personality rights, proposing a unified "Consent–Compensation–Control" framework.',
    subtitle: '',
    author: 'Pooja Chopra, Reeta Sony A.L., Shruti Chopra',
    role: 'HSE University',
    readTime: '12 min read',
    coverImage:
      'https://lida.hse.ru/public/journals/33/cover_issue_1830_ru_RU.png',
    coverImageAlt: 'Legal Issues in the Digital Age journal cover',
    content: [],
    externalUrl: 'https://lida.hse.ru/article/view/28690',
  },
  {
    id: 9,
    category: 'Policy',
    date: 'Feb 5, 2026',
    title: 'Vivek Oberoi Joins Celebrities Seeking Legal Protection of Identity Against AI Misuse',
    description:
      'Delhi High Court grants interim protection to Vivek Oberoi, reinforcing the growing legal shield around celebrity personality rights against deepfakes and AI-generated misuse.',
    subtitle: '',
    author: 'Exchange4Media',
    role: 'Exchange4Media',
    readTime: '4 min read',
    coverImage:
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'Indian court protecting celebrity personality rights from AI misuse',
    content: [],
    externalUrl: 'https://www.exchange4media.com/digital-news/vivek-oberoi-joins-celebrities-seeking-legal-protection-of-identity-151719.html',
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
