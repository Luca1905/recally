import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { GreetUser } from "../ui/greeting";

export default function DecksHeader({
  onCreate,
  username,
}: {
  onCreate: () => void;
  username: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <GreetUser name={username} />
      <div className="flex items-center gap-2">
        <Button onClick={onCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Deck
        </Button>
      </div>
    </div>
  );
}
