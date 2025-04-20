import AnimatedTestimonials from "@/components/ui/animated-testomonials";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "The attention to detail and the quality of medical equipment have completely transformed our hospital workflow. This is exactly what our healthcare facility needed.",
      name: "Dr. Sarah Chen",
      designation: "Medical Director at CityHealth Hospital",
      src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The reliability of their products is remarkable for our surgical procedures.",
      name: "Dr. Michael Rodriguez",
      designation: "Chief Surgeon at MedCenter",
      src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Their medical equipment has significantly improved our patient care. The intuitive design makes complex procedures simple and efficient.",
      name: "Dr. Emily Watson",
      designation: "Head of Cardiology at HeartCare Center",
      src: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust medical devices. It's rare to find a supplier that delivers such high-quality healthcare equipment consistently.",
      name: "Dr. James Kim",
      designation: "Director of Medical Technology at HealthPro",
      src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The reliability and performance of their equipment have been game-changing for our healthcare practice. Highly recommend to any hospital or clinic.",
      name: "Dr. Lisa Thompson",
      designation: "Chief Medical Officer at RegionalCare",
      src: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  );
}
