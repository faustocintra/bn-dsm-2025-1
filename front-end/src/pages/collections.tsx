import { useState } from "react";


const initialWorkspaces = [
  {
    name: "My Workspace",
    createdBy: "You",
    access: "Only the creator",
    type: "Personal",
    lastUpdated: "5 months ago",
  },
  {
    name: "Team Workspace",
    createdBy: "Private user",
    access: "Everyone in Snack Prompt team",
    type: "Team (3 members)",
    lastUpdated: "10 months ago",
  },
];

export default function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState(initialWorkspaces);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    createdBy: "",
    access: "",
    type: "",
    lastUpdated: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.createdBy || !form.access || !form.type) return;
    setWorkspaces((prev) => [...prev, { ...form, lastUpdated: "Just now" }]);
    setIsDialogOpen(false);
    setForm({
      name: "",
      createdBy: "",
      access: "",
      type: "",
      lastUpdated: "",
    });
  };

  const handleSort = (key: any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedWorkspaces = [...workspaces].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredWorkspaces = sortedWorkspaces.filter((workspace) =>
    Object.values(workspace).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div>
        <a href="/" className="text-sm text-gray-400">
          Voltar
        </a>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mt-4">Espaços de trabalhos</h1>
        <button
          className="mt-4 bg-pink-600 px-4 py-2 rounded text-white cursor-pointer border-none"
          onClick={() => setIsDialogOpen(true)}
        >
          Novo Espaço
        </button>
      </div>

      <p className="text-gray-400 mb-4">
        Um diretório de todos os espaços de trabalho no Snack Prompt.
      </p>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Pesquisar"
          className="flex p-2 bg-gray-700 border border-gray-600 rounded text-white w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-gray-700 p-4 rounded">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-600 text-gray-400">
              <th
                className="py-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Nome do espaço
              </th>
              <th>Autor</th>
              <th>Acessos</th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("lastUpdated")}
              >
                Última atualização
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkspaces.map((workspace, index) => (
              <tr key={index} className="border-b border-gray-600">
                <td className="py-3">{workspace.name}</td>
                <td className="flex items-center gap-2">
                
                  {workspace.createdBy}
                </td>
                <td>
                  {workspace.access}{" "}
                  <span className="text-gray-400 text-sm">
                    ({workspace.type})
                  </span>
                </td>
                <td>{workspace.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded">
            <h2 className="text-xl mb-4">Criar Novo Espaço</h2>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded text-white"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="createdBy"
              placeholder="Autor"
              className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded text-white"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="access"
              placeholder="Acesso"
              className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded text-white"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="type"
              placeholder="Tipo"
              className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded text-white"
              onChange={handleInputChange}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 px-4 py-2 rounded text-white"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-pink-600 px-4 py-2 rounded text-white"
                onClick={handleSubmit}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
