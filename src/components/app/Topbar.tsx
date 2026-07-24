export default function Topbar({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="border-b border-[color:var(--line)] bg-[color:var(--cream)]/80 backdrop-blur-md sticky top-0 z-30">
      <div className="px-6 md:px-10 py-6 flex flex-col md:flex-row md:items-end gap-4 md:gap-6 md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-[color:var(--ink-70)]">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>
    </div>
  );
}
