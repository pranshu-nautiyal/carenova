export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-sm text-[color:var(--ink-70)]">
          <span className="font-medium text-[color:var(--ink)]">CareNova</span> — a Congressional App Challenge submission. Demo patient data is fictional.
        </div>
        <div className="text-xs text-[color:var(--ink-50)]">
          Not medical advice. In an emergency, call 911.
        </div>
      </div>
    </footer>
  );
}
