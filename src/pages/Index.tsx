import { ProductsTable } from "@/components/ProductsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Каталог товаров</h1>
          <p className="text-muted-foreground">
            Таблица с сезонностью и группировкой по категориям
          </p>
        </div>
        <ProductsTable />
      </div>
    </div>
  );
};

export default Index;
