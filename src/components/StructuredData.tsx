import { useEffect } from 'react';

interface StructuredDataProps {
  data: object | object[];
}

export const StructuredData = ({ data }: StructuredDataProps) => {
  useEffect(() => {
    const schemas = Array.isArray(data) ? data : [data];
    
    schemas.forEach((schema, index) => {
      const scriptId = `structured-data-${index}`;
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      
      script.textContent = JSON.stringify(schema);
    });

    // Cleanup old scripts if data length decreased
    return () => {
      const allScripts = document.querySelectorAll('[id^="structured-data-"]');
      allScripts.forEach((script, index) => {
        if (index >= schemas.length) {
          script.remove();
        }
      });
    };
  }, [data]);

  return null;
};
