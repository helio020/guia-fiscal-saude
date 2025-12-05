"use client";

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button onClick={handlePrint} className="print-button">
      📥 Imprimir / Salvar como PDF
    </button>
  );
}
