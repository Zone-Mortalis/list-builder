import { createFileRoute } from "@tanstack/react-router";
import { ListBuilder } from "@/components/list-builder";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <ListBuilder />;
}
