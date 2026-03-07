const ABNRegistrationProgress = ({ completed, total }: { completed: number; total: number }) => {
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">Application Progress</span>
        <span className="font-semibold text-primary">{pct}% complete</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {completed} of {total} sections completed
      </p>
    </div>
  );
};

export default ABNRegistrationProgress;
