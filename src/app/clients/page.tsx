'use client';

import Image from "next/image";

const allClients = [
   { name: 'Apollo Sage Group', logo: '/images/clients/client1.png' },
  { name: 'Sagar Group', logo: '/images/clients/client2.jpg' },
  { name: 'SMPL', logo: '/images/clients/client3.png' },
  { name: 'Vardhaman Group', logo: '/images/clients/client4.jpg' },
  { name: 'Client 5', logo: '/images/clients/agarwal power.png' },
  { name: 'Client 6', logo: '/images/clients/anant spelling mills.png' },
  { name: 'Client 6', logo: '/images/clients/l&t.png' },
  { name: 'Client 6', logo: '/images/clients/Lnct.png' },
  { name: 'Client 6', logo: '/images/clients/lupin.png' },
  { name: 'Client 6', logo: '/images/clients/p&g.png' },
  { name: 'Client 6', logo: '/images/clients/som.png' },
  { name: 'Client 6', logo: '/images/clients/sge.jpg' },
  { name: 'Client 6', logo: '/images/clients/ tit.jpg' },
  { name: 'Client 6', logo: '/images/clients/jnct.png' },
  { name: 'Client 6', logo: '/images/clients/raja-bhoj-airport.webp' },
  { name: 'Client 6', logo: '/images/clients/ipca.jpg' },
  { name: 'Client 6', logo: '/images/clients/images (21).png' },
    { name: 'Client 6', logo: '/images/clients/heg.png' },
    { name: 'Client 6', logo: '/images/clients/green surfer.jpg' },
      { name: 'Client 6', logo: '/images/clients/eicher.png' },
      { name: 'Client 6', logo: '/images/clients/download.jpg' },
        { name: 'Client 6', logo: '/images/clients/dilip-buildcon.jpg' },
          { name: 'Client 6', logo: '/images/clients/daulatram.png' },  
  
];

export default function ClientsPage() {
  return (
    <section className="min-h-screen bg-[#F7FAEF] pt-32 px-8">
      <h1 className="text-4xl font-bold text-green-900 text-center mb-12">
        Our Clients
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {allClients.map((client, i) => (
          <div key={i} className="relative w-full h-32 flex items-center justify-center bg-white rounded-xl shadow hover:shadow-lg transition">
            <Image
              src={client.logo}
              alt={client.name}
              fill
              className="object-contain p-4"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
