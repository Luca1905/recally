import { LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function DecksFilterBar({
  searchQuery,
  onSearchChange,
  allTags,
  selectedTags,
  onTagToggle,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  viewMode,
  onViewModeChange,
  clearFilters,
}: {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  sortBy: "name" | "lastModified" | "cardCount";
  onSortByChange: (v: "name" | "lastModified" | "cardCount") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (v: "asc" | "desc") => void;
  viewMode: "grid" | "list";
  onViewModeChange: (v: "grid" | "list") => void;
  clearFilters: () => void;
}) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search decks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <div className="mb-2 font-medium text-foreground text-sm">
                  Tags
                </div>
                <div className="mb-4 flex flex-wrap gap-1">
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={
                        selectedTags.includes(tag) ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => onTagToggle(tag)}
                      className="h-7 text-xs"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
                <div className="mb-2 font-medium text-foreground text-sm">
                  Sort by
                </div>
                <Select value={sortBy} onValueChange={onSortByChange}>
                  <SelectTrigger className="mb-2 w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="lastModified">Last Modified</SelectItem>
                    <SelectItem value="cardCount">Card Count</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mb-2 font-medium text-foreground text-sm">
                  Order
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={sortOrder === "asc" ? "default" : "outline"}
                    size="sm"
                    onClick={() => onSortOrderChange("asc")}
                    className="flex-1"
                  >
                    Ascending
                  </Button>
                  <Button
                    variant={sortOrder === "desc" ? "default" : "outline"}
                    size="sm"
                    onClick={() => onSortOrderChange("desc")}
                    className="flex-1"
                  >
                    Descending
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-4 w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex rounded-md border border-input">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => onViewModeChange("grid")}
              className="rounded-r-none"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => onViewModeChange("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
