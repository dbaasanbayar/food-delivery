import { FoodWithCategory } from "./_component/foods_with_category";
import { Footer } from "./_component/footer";
import { Header } from "./_component/header";

export default function Home() {
  return (
    <div>
      <Header />
      <FoodWithCategory />
      <Footer />
    </div>
  );
}
