import { notFound } from "next/navigation";
import { services } from "@/data/services";
import ServicePageContent from "@/components/ServicePageContent";

export default function ServicePage({ params }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return <ServicePageContent service={service} />;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}