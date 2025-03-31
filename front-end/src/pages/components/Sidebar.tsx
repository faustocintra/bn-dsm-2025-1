import React, { JSX } from 'react';
import { FaPlus } from 'react-icons/fa'; // Ícone de criar

interface SidebarProps {
  endpoints: { url: string; method: string }[];
  selectEndpoint: (index: number) => void;
  deleteEndpoint: (index: number) => void;
  selectedIndex: number | null;
  createEndpoint: () => void;
}

export function Sidebar({
  endpoints,
  selectEndpoint,
  deleteEndpoint,
  selectedIndex,
  createEndpoint,
}: SidebarProps): JSX.Element {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-6">

      <button
        onClick={createEndpoint}
        className="mb-6 text-white p-0 w-max rounded-fullfocus:outline-none transition p-2"
        title="Criar Endpoint"
      >
        <FaPlus size={24} />
      </button>

      <ul>
        {endpoints.map((endpoint, index) => (
          <li key={index} className="mb-2 flex items-center justify-between">
            <button
              className={`flex-1 text-left p-3 rounded-md transition whitespace-nowrap overflow-hidden overflow-ellipsis ${selectedIndex === index ? 'bg-gray-500' : 'bg-gray-700 hover:bg-gray-500'
                }`}
              onClick={() => selectEndpoint(index)}
              title={`${endpoint.method} - ${endpoint.url}`}
            >
              {endpoint.method} - {endpoint.url}
            </button>
            <button
              className="ml-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
              onClick={() => deleteEndpoint(index)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
