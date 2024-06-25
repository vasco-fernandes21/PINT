import React, { useEffect, cloneElement } from 'react';

const apiKey = 'AIzaSyAFwo0EO4sEwzxA--wLspoU7ovH-qPUWKY';
const url = 'https://translation.googleapis.com/language/translate/v2';

async function translateText(text, targetLang) {
  try {
    const response = await fetch(`${url}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
      }),
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Erro ao traduzir texto:", error);
    return text; // Retorna o texto original em caso de erro
  }
}

function Translator({ children }) {
    useEffect(() => {
      const translateSite = async () => {
        const targetLang = 'en';
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
    
        for (const element of elementsToTranslate) {
          const originalText = element.innerText;
          const translatedText = await translateText(originalText, targetLang);
          element.innerText = translatedText;
        }
      };
    
      translateSite();
    }, []);
  
    const addDataTranslateToChildren = (children) => {
      return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Adiciona o atributo data-translate se o elemento for um componente React
          let newProps = { ...child.props, 'data-translate': true };
          if (child.props.children) {
            // Se o componente tiver filhos, aplique a função recursivamente
            newProps.children = addDataTranslateToChildren(child.props.children);
          }
          return cloneElement(child, newProps);
        }
        return child;
      });
    };
  
    return <>{addDataTranslateToChildren(children)}</>;
  }
  
  export default Translator;