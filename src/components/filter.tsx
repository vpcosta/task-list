import { List, ListChecks, ListX } from "lucide-react";
import { Badge } from "./ui/badge";

export type FilterType = "all" | "pending" | "completed";
interface FilterProps {
  currentFilter: FilterType;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

export function Filter({ currentFilter, setCurrentFilter }: FilterProps) {
  return (
    <div className="mt-5 flex gap-2">
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "all" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("all")}
      >
        <List />
        Todas
      </Badge>

      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "pending" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("pending")}
      >
        <ListX />
        Não Concluídas
      </Badge>

      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "completed" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("completed")}
      >
        <ListChecks />
        Concluídas
      </Badge>
    </div>
  );
}
