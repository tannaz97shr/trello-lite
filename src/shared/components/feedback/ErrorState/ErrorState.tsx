"use client";
export function ErrorState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div style={{ padding: 12 }}>
      <b>{title}</b>
      {description ? (
        <div style={{ marginTop: 6, opacity: 0.8 }}>{description}</div>
      ) : null}
    </div>
  );
}
