import { useEffect } from 'react';
import { SEOData } from '@/lib/seo';

interface SEOHeadProps {
  data: SEOData;
}

export const SEOHead = ({ data }: SEOHeadProps) => {
  useEffect(() => {
    // Update title
    document.title = data.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Standard meta tags
    updateMetaTag('description', data.description);
    if (data.keywords) {
      updateMetaTag('keywords', data.keywords);
    }
    
    // Ensure indexing is allowed (remove any noindex)
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag('og:title', data.title, true);
    updateMetaTag('og:description', data.description, true);
    updateMetaTag('og:url', data.canonical || window.location.href, true);
    if (data.ogImage) {
      updateMetaTag('og:image', data.ogImage, true);
    }

    // Twitter Card
    updateMetaTag('twitter:title', data.title);
    updateMetaTag('twitter:description', data.description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = data.canonical || window.location.href;
  }, [data]);

  return null;
};
