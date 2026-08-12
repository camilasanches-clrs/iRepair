import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    try {
      await register(name, email, password);
      navigate("/");
    } catch (error) {
      setErro("Não foi possível criar a conta. Verifique os dados.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-slate-500 font-mono text-xs tracking-widest uppercase">
            Nova Ordem
          </span>
          <span className="text-slate-500 font-mono text-xs">Cadastro</span>
        </div>

        <div className="bg-white rounded shadow-lg border-l-4 border-amber-500 overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-dashed border-slate-200">
            <h1 className="text-2xl font-bold text-slate-800">iRepair</h1>
            <p className="text-slate-500 text-sm mt-1">
              Crie sua conta para acessar o painel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6">
            <label className="block text-xs font-mono uppercase tracking-wide text-slate-500 mb-1">
              Nome
            </label>
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <label className="block text-xs font-mono uppercase tracking-wide text-slate-500 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <label className="block text-xs font-mono uppercase tracking-wide text-slate-500 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            {erro && <p className="text-red-600 text-sm mt-2 mb-2">{erro}</p>}

            <button
              type="submit"
              className="w-full bg-slate-800 text-white px-4 py-2 rounded mt-4 hover:bg-amber-600 transition-colors"
            >
              Criar conta
            </button>

            <p className="text-center text-sm text-slate-500 mt-4">
              Já tem uma conta?{" "}
              <a href="/login" className="text-amber-600 hover:underline">
                Entrar
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}