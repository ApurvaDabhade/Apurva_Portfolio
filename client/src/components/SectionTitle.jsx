import { Children, isValidElement, useEffect, useRef } from 'react';

function splitTextToWords(text, keyPrefix) {
  const parts = [];
  const tokens = text.match(/[A-Za-z0-9']+|[^A-Za-z0-9'\s]+|\s+/g) || [];
  tokens.forEach((tok, i) => {
    if (/^[A-Za-z0-9']+$/.test(tok)) {
      parts.push(<span className="word" key={`${keyPrefix}-w-${i}`}>{tok}</span>);
    } else {
      parts.push(tok);
    }
  });
  return parts;
}

function processChildren(children, keyPrefix = 't') {
  return Children.toArray(children).flatMap((child, idx) => {
    const kp = `${keyPrefix}-${idx}`;
    if (typeof child === 'string') return splitTextToWords(child, kp);
    if (isValidElement(child) && child.type === 'em') {
      return <em key={kp}>{processChildren(child.props.children, kp)}</em>;
    }
    return child;
  });
}

export default function SectionTitle({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const titleIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.word').forEach((w, i) => {
          setTimeout(() => w.classList.add('v'), i * 38);
        });
        titleIO.unobserve(e.target);
      });
    }, { threshold: 0.35 });

    titleIO.observe(el);
    return () => titleIO.disconnect();
  }, []);

  return (
    <h2 className="sec-title" ref={ref}>
      {processChildren(children)}
    </h2>
  );
}
