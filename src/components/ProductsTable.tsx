import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, products } from "@/types/products";

const getSeasonColor = (season: string) => {
  const colorMap: Record<string, string> = {
    "ВЕСНА": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    "ЛЕТО": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    "ОСЕНЬ": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    "ЗИМА": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "НОВЫЙ ГОД": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    "ВСЕЗОННАЯ ПРОДУКЦИЯ": "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
    "НЕТ В НАЛИЧИИ": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };
  return colorMap[season] || "bg-muted text-muted-foreground";
};

export const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [seasonFilter, setSeasonFilter] = useState<string>("all");
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [subgroupFilter, setSubgroupFilter] = useState<string>("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = seasonFilter === "all" || product.season === seasonFilter;
    const matchesGroup = groupFilter === "all" || product.group === groupFilter;
    const matchesSubgroup = subgroupFilter === "all" || product.subgroup === subgroupFilter;

    return matchesSearch && matchesSeason && matchesGroup && matchesSubgroup;
  });

  const seasons = Array.from(new Set(products.map(p => p.season))).sort();
  const groups = Array.from(new Set(products.map(p => p.group))).sort();
  const subgroups = Array.from(new Set(products.map(p => p.subgroup))).sort();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Поиск товара..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-80"
        />

        <Select value={seasonFilter} onValueChange={setSeasonFilter}>
          <SelectTrigger className="md:w-60">
            <SelectValue placeholder="Сезонность" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все сезоны</SelectItem>
            {seasons.map((season) => (
              <SelectItem key={season} value={season}>
                {season}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={groupFilter} onValueChange={setGroupFilter}>
          <SelectTrigger className="md:w-60">
            <SelectValue placeholder="Группа" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все группы</SelectItem>
            {groups.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={subgroupFilter} onValueChange={setSubgroupFilter}>
          <SelectTrigger className="md:w-60">
            <SelectValue placeholder="Подгруппа" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все подгруппы</SelectItem>
            {subgroups.map((subgroup) => (
              <SelectItem key={subgroup} value={subgroup}>
                {subgroup}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-40">Сезонность</TableHead>
              <TableHead className="w-48">Наличие</TableHead>
              <TableHead className="w-40">Группа</TableHead>
              <TableHead className="w-48">Подгруппа</TableHead>
              <TableHead>Название товара</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Товары не найдены
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge className={getSeasonColor(product.season)}>
                      {product.season}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {product.availability}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{product.group}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{product.subgroup}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{product.name}</span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Показано товаров: {filteredProducts.length} из {products.length}
      </div>
    </div>
  );
}
