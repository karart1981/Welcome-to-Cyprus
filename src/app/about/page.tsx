// components/AboutUsServer.tsx
import AboutUsClient from './AboutClient';

export type Language = 'en' | 'gr' | 'ru';

type AboutTranslations = {
  title: string;
  subtitle: string;
  paragraphs: string[];
  founded: string;
  mission: string;
};

type AboutData = Record<Language, AboutTranslations>;

export default async function AboutUsServer({
  searchParams
}: {
  searchParams?: { lang?: string };
}) {
  const langParam = searchParams?.lang;
  const lang: Language =
    langParam === 'gr' || langParam === 'ru' ? langParam : 'en';

  const res = await fetch(
    'https://arturkarapetyan-1981.github.io/host_api/about.json',
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch About Us data');
  }

  const data: AboutData = await res.json();
  const content = data[lang];

  return <AboutUsClient content={content} />;
}
