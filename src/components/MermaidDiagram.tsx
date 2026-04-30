import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  themeVariables: {
    background: "transparent",
    primaryColor: "hsl(152 30% 14%)",
    primaryTextColor: "hsl(220 30% 96%)",
    primaryBorderColor: "hsl(152 76% 60%)",
    lineColor: "hsl(195 90% 60%)",
    secondaryColor: "hsl(258 30% 18%)",
    tertiaryColor: "hsl(230 30% 12%)",
    fontFamily: "JetBrains Mono, monospace",
  },
});

let id = 0;
export const MermaidDiagram = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const render = async () => {
      try {
        const uid = `mmd-${++id}`;
        const { svg } = await mermaid.render(uid, chart);
        if (ref.current) ref.current.innerHTML = svg;
      } catch (e) {
        if (ref.current) ref.current.innerHTML = `<pre class="text-xs text-destructive">${(e as Error).message}</pre>`;
      }
    };
    render();
  }, [chart]);

  return <div ref={ref} className="w-full flex items-center justify-center [&_svg]:max-w-full [&_svg]:h-auto" />;
};
