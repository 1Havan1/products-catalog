import { useState, useMemo } from "react";
import { products, Product } from "../data/products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const seasonColors: Record<string, string> = {
  "ВЕСНА": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "ЛЕТО": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "ОСЕНЬ": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "ЗИМА": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "НОВЫЙ ГОД": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "ПОСТОЯННО": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export const ProductsTable = () => {
  const [selectedSeason, setSelectedSeason] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const seasons = useMemo(() => Array.from(new Set(products.map(p => p.season))), []);
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const seasonMatch = selectedSeason === "all" || product.season === selectedSeason;
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
      const searchMatch = searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return seasonMatch && categoryMatch && searchMatch;
    });
  }, [selectedSeason, selectedCategory, searchQuery]);

  const groupedProducts = useMemo(() => {
    const groups: Record<string, Record<string, Product[]>> = {};
    filteredProducts.forEach(product => {
      groups[product.season] ??= {};
      groups[product.season][product.category] ??= [];
      groups[product.season][product.category].push(product);
    });
    return groups;
  }, [filteredProducts]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Поиск по названию:</label>
          <Input
            type="text"
            placeholder="Введите название товара..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Фильтр по сезону:</label>
          <Select value={selectedSeason} onValueChange={setSelectedSeason}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите сезон" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              {seasons.map(season => (
                <SelectItem key={season} value={season}>
                  {season}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Фильтр по категории:</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Сезонность</TableHead>
              <TableHead className="w-[200px]">Категория</TableHead>
              <TableHead>Название товара</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(groupedProducts).map(([season, categories]) => (
              Object.entries(categories).map(([category, items], categoryIndex) => (
                items.map((product, productIndex) => (
                  <TableRow
                    key={`${season}-${category}-${productIndex}`}
                    data-no-border={productIndex === items.length - 1 ? "true" : "false"}
                  >
                    {categoryIndex === 0 && productIndex === 0 && (
                      <TableCell
                        rowSpan={Object.values(categories).flat().length}
                        className="font-semibold align-top bg-muted/50"
                      >
                        <Badge className={seasonColors[season] || "bg-muted text-muted-foreground"}>
                          {season}
                        </Badge>
                      </TableCell>
                    )}
                    {productIndex === 0 && (
                      <TableCell
                        rowSpan={items.length}
                        className="font-medium align-top"
                      >
                        {category}
                      </TableCell>
                    )}
                    <TableCell>{product.name}</TableCell>
                  </TableRow>
                ))
              ))
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  Товары не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Всего товаров: {filteredProducts.length}
      </div>
    </div>
  );
};

export default ProductsTable;