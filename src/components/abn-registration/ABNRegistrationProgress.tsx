const ABNRegistrationProgress = ({ completed, total }: { completed: number; total: number }) => {
  const pct = Math.round((completed / total) * 100);

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
