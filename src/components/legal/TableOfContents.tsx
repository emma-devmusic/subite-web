import React, { useState } from 'react';

interface TableOfContentsProps {
  sections: Array<{
    id: string;
    title: string;
    subsections?: Array<{
      id: string;
      title: string;
    }>;
  }>;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          📋 Índice de contenidos
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden text-gray-600 hover:text-gray-900"
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>
      
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <nav className="space-y-2">
          {sections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="text-left w-full text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {section.title}
              </button>
              {section.subsections && (
                <div className="ml-4 mt-1 space-y-1">
                  {section.subsections.map((subsection) => (
                    <button
                      key={subsection.id}
                      onClick={() => scrollToSection(subsection.id)}
                      className="block text-left w-full text-xs text-gray-600 hover:text-gray-800 hover:underline transition-colors"
                    >
                      {subsection.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};