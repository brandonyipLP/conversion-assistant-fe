import React from "react";
import Link from "next/link";
import Image from "next/image";
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        <Image
          src="/hero-image.jpg"
          alt="Nike Hero"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">Just Do It</h1>
          <p className="text-xl mb-8">Innovate. Perform. Succeed.</p>
          <Link
            href="#products"
            className="bg-black text-white px-8 py-3 rounded-full text-lg hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Air Max", "Nike React", "Zoom Fly"].map((product) => (
            <div key={product} className="bg-gray-100 p-6 rounded-lg">
              <div className="bg-white mb-4 rounded-lg overflow-hidden">
                <Image
                  src={`/${product.toLowerCase().replace(" ", "-")}.jpg`}
                  alt={product}
                  width={300}
                  height={300}
                  layout="responsive"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product}</h3>
              <p className="text-gray-600 mb-4">
                Experience ultimate comfort and style.
              </p>
              <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Innovation Section */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Innovative Technology</h2>
          <p className="text-xl mb-8">
            Our cutting-edge designs and materials push the boundaries of
            athletic performance.
          </p>
          <Link
            href="#"
            className="bg-white text-black px-8 py-3 rounded-full text-lg hover:bg-gray-200 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <Image
              src="/sustainability.jpg"
              alt="Sustainability"
              width={500}
              height={500}
              layout="responsive"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">
              Committed to Sustainability
            </h2>
            <p className="text-xl mb-6">
              We're dedicated to reducing our environmental impact and creating
              a better future for sport.
            </p>
            <Link
              href="#"
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              Our Initiatives
            </Link>
          </div>
        </div>
      </section>

      <ChatWidget />
    </main>
  );
}
