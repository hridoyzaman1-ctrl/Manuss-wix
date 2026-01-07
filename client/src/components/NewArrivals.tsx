import { Button } from "./ui/button";

export default function NewArrivals() {
  const products = [
    {
      title: "Poetry Collection First Edition",
      price: "180.00৳",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Famous Novel Illustrated Edition",
      price: "275.00৳",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="w-full bg-[#F4F4F4] py-24">
      <div className="container mx-auto px-4 md:px-12">
        
        <div className="mb-16">
          <h2 className="font-serif text-5xl font-bold uppercase tracking-tight text-black mb-4">
            New Arrivals
          </h2>
          <p className="text-lg text-gray-600">
            Exciting Courses & Programs
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white p-0 flex flex-col md:flex-row h-auto md:h-[400px] group overflow-hidden">
              {/* Content Left */}
              <div className="flex-1 p-12 flex flex-col items-center justify-center text-center gap-6">
                <h3 className="font-serif text-2xl font-bold text-black">
                  {product.title}
                </h3>
                <div className="w-8 h-[1px] bg-black/20"></div>
                <p className="font-sans text-lg text-gray-600">
                  {product.price}
                </p>
                <Button 
                  variant="outline"
                  className="rounded-none border-black text-black hover:bg-black hover:text-white px-8 py-6 text-xs uppercase tracking-widest mt-4 transition-all duration-300"
                >
                  View Details
                </Button>
              </div>

              {/* Image Right */}
              <div className="flex-1 relative overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain p-12 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-12">
          <Button 
            variant="outline"
            className="rounded-none border-black bg-transparent text-black hover:bg-black hover:text-white px-10 py-6 text-xs uppercase tracking-widest"
          >
            Browse All
          </Button>
        </div>

      </div>
    </section>
  );
}
