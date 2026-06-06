import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`cosmic-section py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
