import React, { JSX, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atelierLakesideDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FaDownload, FaExchangeAlt } from "react-icons/fa";

interface ApiResponseProps {
  response: any;
  executionTime: string;
}

const exportToFile = (data: any, type: string) => {
  const fileData = JSON.stringify(data, null, 2);
  const blob = new Blob([fileData], {
    type: type === "json" ? "application/json" : "text/plain",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `response.${type}`;
  link.click();
};

export function ApiResponse({
  response,
  executionTime,
}: ApiResponseProps): JSX.Element | null {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRaw, setIsRaw] = useState(false); // alternar de JSON para Raw Data

  if (!response) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white relative">
      <h2 className="text-xl font-semibold mb-4">Response</h2>
      <p className="mb-2 text-sm text-gray-400">
        Tempo de execução: {executionTime ? `${executionTime} ms` : "N/A"}
      </p>

      {/* Botão para mudar entre JSON e Raw Data */}
      <button
        onClick={() => setIsRaw(!isRaw)}
        className="absolute top-3.5 right-17 text-white bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-md flex items-center"

      >
        <FaExchangeAlt className="mr-2" />
        {isRaw ? "JSON" : "Raw Data"}
      </button>

      <SyntaxHighlighter
        language={isRaw ? "text" : "json"}
        style={atelierLakesideDark}
        wrapLongLines={true}
        wrapLines={true}
      >
        {isRaw ? JSON.stringify(response) : JSON.stringify(response, null, 2)}
      </SyntaxHighlighter>

      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
      >
        <FaDownload />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-12 right-4 w-48 rounded-md shadow-lg bg-gray-700 text-white">
          <button
            onClick={() => exportToFile(response, "json")}
            className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
          >
            Exportar JSON
          </button>
          <button
            onClick={() => exportToFile(response, "txt")}
            className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
          >
            Exportar TXT
          </button>
        </div>
      )}
    </div>
  );
}
