import { Button } from "~/components/ui/button";

export default function DecksTagChips({
  selectedTags,
  onTagToggle,
  clearFilters,
}: {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  clearFilters: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {selectedTags.map((tag) => (
        <Button
          key={tag}
          variant="secondary"
          size="sm"
          onClick={() => onTagToggle(tag)}
          className="h-7 text-xs"
        >
          {tag}
          <span className="ml-1">×</span>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={clearFilters}
        className="h-7 text-xs"
      >
        Clear all
      </Button>
    </div>
  );
}
