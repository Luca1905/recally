import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function DecksHeader({
  onCreate,
}: {
  onCreate: () => void;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="font-bold text-2xl text-foreground">All Decks</h1>
      <Button onClick={onCreate}>
        <Plus className="mr-2 h-4 w-4" />
        New Deck
      </Button>
    </div>
  );
}
