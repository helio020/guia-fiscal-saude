import { readFile } from "fs/promises";
import { join } from "path";
import "./ebook.css";
import PrintButton from "./PrintButton";

export default async function EbookPage() {
  // Lê o conteúdo do ebook
  const filePath = join(process.cwd(), "content", "ebook.md");
  const content = await readFile(filePath, "utf-8");

  // Converte markdown básico para HTML
  const htmlContent = convertMarkdownToHtml(content);

  return (
    <div className="ebook-container">
      <div className="ebook-header">
        <PrintButton />
      </div>
      <article
        className="ebook-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

/**
 * Converte markdown básico para HTML
 */
function convertMarkdownToHtml(markdown: string): string {
  let html = markdown;

  // Processa checklists primeiro
  html = html.replace(/- \[ \] (.+)/g, '<li class="checkbox">☐ $1</li>');
  html = html.replace(
    /- \[x\] (.+)/g,
    '<li class="checkbox checked">☑ $1</li>'
  );

  // Listas normais
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");

  // Agrupa listas (checklist primeiro)
  html = html.replace(/(<li class="checkbox[^"]*">.*?<\/li>\n?)+/g, (match) => {
    return `<ul class="checklist">${match}</ul>`;
  });

  // Depois lista normal
  html = html.replace(/(<li(?! class="checkbox).*?<\/li>\n?)+/g, (match) => {
    return `<ul>${match}</ul>`;
  });

  // Títulos
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");

  // Negrito
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Separadores
  html = html.replace(/^---$/gm, "<hr />");

  // Parágrafos (linhas que não são títulos, listas ou separadores)
  const lines = html.split("\n");
  const processedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      continue; // Pula linhas vazias
    }

    // Se já foi processado (é HTML), mantém
    if (
      trimmed.startsWith("<") &&
      (trimmed.endsWith(">") || trimmed.includes("</"))
    ) {
      processedLines.push(line);
      continue;
    }

    // Se não foi processado, é um parágrafo
    processedLines.push(`<p>${line}</p>`);
  }

  html = processedLines.join("\n");

  // Remove múltiplas quebras de linha
  html = html.replace(/\n{3,}/g, "\n\n");

  return html;
}
