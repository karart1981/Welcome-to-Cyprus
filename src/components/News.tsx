'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { NewsItem } from '../types/types';

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [language, setLanguage] = useState<'en' | 'gr' | 'ru'>('en');
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const langParam = searchParams.get('lang') as 'en' | 'gr' | 'ru';
    setLanguage(langParam || 'en');
  }, [searchParams]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch('/data/newsData.json');
      const data = await res.json();
      setNews(data[language] || []);
    };
    fetchNews();
  }, [language]);

  const handleShowMore = () => {
    router.push(`/blog?lang=${language}`);
  };

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ');
  };

  return (
    <div className="max-w-5xl mx-auto p-4 select-none">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {language === 'gr'
          ? 'Ειδήσεις για τον Τουρισμό στην Κύπρο'
          : language === 'ru'
          ? 'Новости туризма на Кипре'
          : 'Cyprus Tourism News'}
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mb-6 select-none">
        {news.slice(0, 6).map((item) => {
          const isExpanded = expandedItems[item.id];
          const displayedText = isExpanded ? item.text : truncateText(item.text, 40);

          return (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700 text-justify">
                  {displayedText}
                  {!isExpanded && item.text.split(' ').length > 20 && (
                    <>
                      ...{' '}
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {language === 'gr' ? 'Περισσότερα' : language === 'ru' ? 'Читать далее' : 'More'}
                      </button>
                    </>
                  )}
                  {isExpanded && (
                    <>
                      {' '}
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {language === 'gr' ? 'Λιγότερα' : language === 'ru' ? 'Скрыть' : 'Less'}
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleShowMore}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {language === 'gr'
            ? 'Περισσότερα Νέα'
            : language === 'ru'
            ? 'Больше новостей'
            : 'More News'}
        </button>
      </div>
    </div>
  );
}



