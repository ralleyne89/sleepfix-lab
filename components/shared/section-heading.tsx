interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  body?: string;
}

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-serif text-4xl font-semibold tracking-[-0.06em] text-balance sm:text-5xl">
        {title}
      </h2>
      {body ? (
        <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );
}
