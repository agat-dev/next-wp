"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Ensure this is the correct import path
import { Button } from "@/components/ui/button"; // Add this import for the Button component

interface Author {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Annee {
  id: number;
  name: string;
}

interface FilterPostsProps {
  authors: Author[];
  tags: Tag[];
  categories: Category[];
  annees: Annee[];
  selectedAuthor?: string;
  selectedTag?: string;
  selectedCategory?: string;
  selectedAnnee?: number;
}

export default function FilterPosts({
  authors,
  tags,
  categories,
  annees,
  selectedAuthor,
  selectedTag,
  selectedCategory,
  selectedAnnee,
}: FilterPostsProps) {
  const router = useRouter();

  const handleFilterChange = (type: string, value: string) => {
    console.log(`Filter changed: ${type} -> ${value}`);
    const newParams = new URLSearchParams(window.location.search);
    if (value === "all") {
      newParams.delete(type);
    } else {
      newParams.set(type, value);
    }
    router.push(`/projet?${newParams.toString()}`);
  };

  const handleResetFilters = () => {
    router.push("/projet");
  };

  return (
    <div className="grid md:grid-cols-[1fr_1fr_1fr_0.5fr] gap-2 my-4 !z-10">
      <Select
        value={selectedAnnee !== undefined ? selectedAnnee.toString() : "all"}
        onValueChange={(value) => handleFilterChange("annee", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Années" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Années</SelectItem>
          {annees
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((annee) => (
              <SelectItem key={annee.id} value={annee.id.toString()}>
              {annee.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedCategory || "all"}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Type de projet" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Catégorie</SelectItem>
            {categories
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>


      <Button variant="outline" onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </div>
  );
}
