import { ProductsTable } from "../components/ProductsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-foreground">Таблица сезонности товаров</h1>
          <p className="text-lg text-muted-foreground">
            Товары сгруппированы по сезонам и категориям
          </p>
        </header>
        <ProductsTable />
      </div>
    </div>
  );
};

export default Index;