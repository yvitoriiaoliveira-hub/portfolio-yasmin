import { BookOpen, Dumbbell, Flame, Square, SquareCheckBig } from "lucide-react";

import { cn } from "@/lib/utils";

import { BrowserFrame } from "./mockup-frame";

const days = ["S", "T", "Q", "Q", "S", "S", "D"];
const tasks = [
  { text: "Revisar projeto da faculdade", done: true },
  { text: "Treino às 18h", done: true },
  { text: "Estudar 1h de Python", done: false },
];
const habits = [
  { icon: BookOpen, label: "Leitura", streak: [1, 1, 1, 0, 1, 1, 0] },
  { icon: Dumbbell, label: "Treino", streak: [1, 0, 1, 1, 0, 1, 0] },
];

export function LifeMockup() {
  return (
    <BrowserFrame url="meu mundo · hoje" className="text-[10px]">
      <div className="grid grid-cols-[1.25fr_1fr]">
        <div className="border-r border-border p-3">
          <div className="flex gap-1">
            {days.map((day, index) => (
              <span
                key={`${day}-${index}`}
                className={cn(
                  "flex flex-1 flex-col items-center rounded-md py-1 text-[8px]",
                  index === 2 ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted",
                )}
              >
                {day}
                <span className="font-mono text-[8.5px]">{12 + index}</span>
              </span>
            ))}
          </div>
          <p className="mt-2.5 font-display text-[11px] font-semibold">Tarefas de hoje</p>
          <ul className="mt-1.5 space-y-1">
            {tasks.map((task) => (
              <li key={task.text} className="flex items-center gap-1.5">
                {task.done ? <SquareCheckBig className="size-3 text-success" /> : <Square className="size-3 text-subtle" />}
                <span className={cn(task.done && "text-subtle line-through")}>{task.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 bg-surface-2/50 p-3">
          <p className="flex items-center gap-1 font-medium">
            <Flame className="size-3 text-amber-500" /> Hábitos da semana
          </p>
          {habits.map(({ icon: Icon, label, streak }) => (
            <div key={label} className="rounded-lg border border-border bg-surface p-2">
              <p className="flex items-center gap-1 text-[9px] font-medium">
                <Icon className="size-3 text-primary" /> {label}
              </p>
              <div className="mt-1.5 flex gap-1">
                {streak.map((on, index) => (
                  <span key={index} className={cn("size-2.5 rounded-sm", on ? "bg-primary" : "bg-surface-3")} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
