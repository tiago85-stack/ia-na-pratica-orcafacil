import { useState } from "react";
import { BarChart3, CheckCircle2, ClipboardList, FileText, Home, Menu, Plus, Settings, Users, Wallet, X } from "lucide-react";
import { formatMoney } from "./utils/money";
type Page = "dashboard" | "clients" | "quotes" | "settings";
const navigation = [{ id: "dashboard", label: "Início", icon: Home }, { id: "clients", label: "Clientes", icon: Users }, { id: "quotes", label: "Orçamentos", icon: FileText }, { id: "settings", label: "Ajustes", icon: Settings }] as const;
const headings: Record<Page, string> = { dashboard: "Visão geral", clients: "Clientes", quotes: "Orçamentos", settings: "Configurações" };
export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  function navigate(next: Page) { setPage(next); setMenuOpen(false); setShowRoadmap(false); }
  return <div className="min-h-screen pb-24 md:pb-8">
    <header className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="rounded-xl bg-primary p-2.5"><FileText size={22}/></div><div><div className="font-bold tracking-tight">OrçaFácil IA</div><div className="text-xs text-slate-300">Orçamentos profissionais</div></div></div>
          <button aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 md:hidden">{menuOpen ? <X/> : <Menu/>}</button>
          <nav aria-label="Navegação principal" className="hidden gap-2 md:flex">{navigation.map(item => <button key={item.id} onClick={() => navigate(item.id)} className={`rounded-lg px-4 py-2 text-sm ${page === item.id ? "bg-primary" : "hover:bg-white/10"}`}>{item.label}</button>)}</nav>
        </div>
        {menuOpen && <nav aria-label="Menu mobile" className="mt-4 grid grid-cols-2 gap-2">{navigation.map(item => <button key={item.id} onClick={() => navigate(item.id)} className="rounded-lg bg-white/10 p-3 text-sm">{item.label}</button>)}</nav>}
        <div className="pb-4 pt-10"><p className="text-sm text-slate-300">Seu negócio, organizado.</p><h1 className="mt-1 text-3xl font-bold">{headings[page]}</h1></div>
      </div>
    </header>
    <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
      {page === "dashboard" ? <>
        <section aria-label="Indicadores" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[{ label: "Orçamentos", value: "0", icon: FileText }, { label: "Valor orçado", value: formatMoney(0), icon: Wallet }, { label: "Aceitos", value: "0", icon: CheckCircle2 }, { label: "Taxa de aceite", value: "0%", icon: BarChart3 }].map(stat => <div key={stat.label} className="min-w-0 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"><div className="flex items-center justify-between gap-1 text-xs text-slate-500"><span>{stat.label}</span><stat.icon size={18} className="shrink-0 text-primary"/></div><div className="mt-3 break-words text-xl font-bold sm:text-2xl">{stat.value}</div></div>)}
        </section>
        <button onClick={() => { navigate("quotes"); setShowRoadmap(true); }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 font-semibold text-white shadow-sm transition hover:bg-blue-700"><Plus size={20}/> Novo orçamento</button>
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><h2 className="font-semibold">Orçamentos recentes</h2><div className="flex flex-col items-center gap-3 py-12 text-center text-slate-500"><ClipboardList size={36} className="text-slate-300"/><p className="text-sm">Nenhum orçamento cadastrado ainda.</p><p className="max-w-sm text-xs">O cadastro e a criação de orçamentos serão liberados na Etapa 2.</p></div></section>
      </> : <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><div className="mb-4 flex items-center gap-3 text-primary">{page === "clients" ? <Users/> : page === "quotes" ? <FileText/> : <Settings/>}<h2 className="text-lg font-bold text-navy">{headings[page]}</h2></div><p className="text-sm leading-relaxed text-slate-600">Esta área está preparada na navegação. As funcionalidades de {page === "clients" ? "cadastro e edição de clientes" : page === "quotes" ? "criação, cálculo e gerenciamento de orçamentos" : "perfil do prestador, idioma e moeda"} serão implementadas nas próximas etapas.</p>{showRoadmap && <p role="status" className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">Criador de orçamentos: previsto para a Etapa 2. Nenhum orçamento foi criado.</p>}<button onClick={() => navigate("dashboard")} className="mt-6 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium">Voltar ao dashboard</button></section>}
      <p className="text-center text-xs text-slate-500">Versão inicial • Dados de demonstração, sem persistência nesta etapa</p>
    </main>
    <nav aria-label="Navegação inferior" className="fixed inset-x-0 bottom-0 z-10 grid grid-cols-4 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-lg md:hidden">{navigation.map(item => <button key={item.id} aria-current={page === item.id ? "page" : undefined} onClick={() => navigate(item.id)} className={`flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] ${page === item.id ? "font-semibold text-primary" : "text-slate-500"}`}><item.icon size={21}/>{item.label}</button>)}</nav>
  </div>;
}
