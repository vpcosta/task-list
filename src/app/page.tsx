import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { List, ListChecks, ListX, Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-rose-50">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input placeholder="Criar nova tarefa" />
          <Button variant="default" className="cursor-pointer">
            <Plus />
            Adicionar Tarefa
          </Button>
        </CardHeader>

        <CardContent>
          <Separator />

          <div className="mt-5 flex gap-2">
            <Badge className="cursor-pointer">
              <List />
              Todas
            </Badge>

            <Badge className="cursor-pointer">
              <ListChecks />
              Concluídas
            </Badge>

            <Badge className="cursor-pointer">
              <ListX />
              Não Concluídas
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
