const ABNRegistrationProgress = ({ completed, total, sticky = false }: { completed: number; total: number; sticky?: boolean }) => {
  const pct = Math.round((completed / total) * 100);

  if (sticky) {
    return (
      <div className="sticky top-0 z-40 -mx-6 md:-mx-10 px-6 md:px-10 py-2 bg-card/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-medium text-primary whitespace-nowrap">{pct}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="mb-1.5 flex items-center justify-end">
        <span className="text-xs font-medium text-primary">{pct}% completed</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ABNRegistrationProgress;
