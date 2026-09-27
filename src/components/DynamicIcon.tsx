import { Camera, MonitorCog, Workflow, Zap, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";

const registry: Record<string, ComponentType<LucideProps>> = {
  "monitor-cog": MonitorCog,
  zap: Zap,
  workflow: Workflow,
  camera: Camera,
};

export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = registry[name] ?? Zap;
  return <Cmp {...props} />;
}
