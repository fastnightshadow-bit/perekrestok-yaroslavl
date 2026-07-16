type EmptyStateProps = {
  action?: React.ReactNode;
  description: string;
  title: string;
};

export function EmptyState({
  action,
  description,
  title,
}: EmptyStateProps) {
  return (
    <div className="mt-10 rounded-[1.5rem] border border-dashed border-neutral-300 bg-white/55 p-7 sm:mt-14 sm:p-9">
      <h3 className="text-xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-2xl">
        {title}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
