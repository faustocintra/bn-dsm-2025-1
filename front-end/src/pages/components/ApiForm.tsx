import React, { JSX } from 'react';
import { FaSave, FaPaperPlane } from 'react-icons/fa';

interface ApiFormProps {
  url: string;
  setUrl: (url: string) => void;
  method: string;
  setMethod: (method: string) => void;
  body: string;
  setBody: (body: string) => void;
  sendRequest: () => Promise<void>;
  saveEndpoint: () => void;
  loading: boolean;
}

export function ApiForm({
  url,
  setUrl,
  method,
  setMethod,
  body,
  setBody,
  sendRequest,
  saveEndpoint,
  loading,
}: ApiFormProps): JSX.Element {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <div className="flex items-center mb-6 gap-4">
        <div className="flex-1">
          <label className="block font-semibold mb-2">Endpoint URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com"
            className="w-full border border-gray-700 bg-gray-900 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-1/4">
          <label className="block font-semibold mb-2">Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border border-gray-700 bg-gray-900 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        <button
          onClick={saveEndpoint}
          className="bg-gray-500 mt-7 text-white p-3 rounded-md hover:bg-green-600 transition"
        >
          <FaSave size={20} />
        </button>

        <button
          onClick={sendRequest}
          disabled={loading}
          className="bg-gray-500 mt-7
           text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-600 transition"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>

      {method !== 'GET' && (
        <div className="mb-6">
          <label className="block font-semibold mb-2">Request Body (JSON)</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='{ "key": "value" }'
            className="w-full border border-gray-700 bg-gray-900 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
}
