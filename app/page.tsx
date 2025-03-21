import PromotionsCarousel from "@/components/promotions-carousel"
import ProductsGrid from "@/components/products-grid"
import LocationSection from "@/components/location-section"

export default function Home() {
  return (
    <div id="top" className="flex flex-col items-center">
      <section className="w-full max-w-[80%] mx-auto my-6">
        <PromotionsCarousel />
      </section>

      <section id="produtos" className="w-full max-w-7xl mx-auto my-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Nossos Produtos</h2>
        <p className="text-center text-gray-600 mb-8">
          Deslize para ver todos os produtos disponíveis ou use as setas para navegar
        </p>
        <ProductsGrid />
      </section>

      <section id="localizacao" className="w-full max-w-7xl mx-auto my-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Nossa Localização</h2>
        <LocationSection />
      </section>
    </div>
  )
}

