const ABNRegistrationProgress = ({ completed, total }: { completed: number; total: number }) => {
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="px-6 md:px-10 py-4">
      <div className="flex items-center gap-3">
        <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs font-medium text-primary whitespace-nowrap">{pct}%</span>
      </div>
    </div>
  );
};

export default ABNRegistrationProgress;
