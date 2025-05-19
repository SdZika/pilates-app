import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { trainers } from "@/constants/trainers";

export default function AboutPage() {

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Intro */}
        <section className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">About Pilates Smederevo</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Pilates Smederevo is a premium Pilates studio dedicated to helping you achieve your fitness goals through mindful movement and expert instruction.
          </p>
          <div className="aspect-video relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/background_studio.webp"
              alt="PilatesFlow Studio"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Philosophy */}
        <section>
          <h2 className="text-2xl font-bold mb-10 text-center">Our Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Mind-Body Connection",
                desc: "We believe in strengthening the connection between mind and body for overall wellness and improved quality of life.",
              },
              {
                title: "Personalized Approach",
                desc: "Every body is different, which is why we tailor our instruction to meet your unique needs and goals.",
              },
              {
                title: "Supportive Community",
                desc: "We foster a welcoming environment where members feel supported and inspired to achieve their best.",
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-2xl shadow-md hover:shadow-xl transition">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm text-center">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trainers */}
        <section id="trainers">
          <h2 className="text-2xl font-bold mb-10 text-center">Meet Our Trainers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <Card id={`trainer-${trainer.id}`} key={trainer.name} className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition">
                <div className="aspect-square relative">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-6 space-y-2">
                  <h3 className="text-lg font-semibold">{trainer.name}</h3>
                  <p className="text-pink-600 dark:text-pink-400 text-sm">{trainer.role}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{trainer.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Studio */}
        <section>
          <h2 className="text-2xl font-bold mb-10 text-center">Our Studio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "State-of-the-Art Equipment",
                desc: "Our studio features premium Pilates towers, chairs, and other specialized equipment to enhance your practice.",
                image: "/facility.webp",
              },
              {
                title: "Tranquil Environment",
                desc: "Designed with serenity in mind, our space provides the perfect atmosphere for focusing on your practice and wellness journey.",
                image: "/equipment.webp",
              },
            ].map((studio) => (
              <Card key={studio.title} className="rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={studio.image}
                    alt={studio.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-6 space-y-2">
                  <h3 className="text-xl font-semibold">{studio.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{studio.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story */}
        <section>
          <h2 className="text-2xl font-bold mb-10 text-center">Our Story</h2>
          <Card className="rounded-2xl shadow-md">
            <CardContent className="pt-6 space-y-4 text-gray-700 dark:text-gray-300 text-sm">
              <p>
                Founded in 2018, Pilates Smederevo began with a simple mission: to create a space where people of all fitness levels could experience the transformative power of Pilates in a supportive, non-intimidating environment.
              </p>
              <p>
                What started as a small studio with fewer equipment has grown into a thriving community dedicated to mindful movement and holistic wellness. Our instructors bring diverse backgrounds in dance, physical therapy, and athletics to create a unique approach to Pilates that honors traditional methods while embracing innovation.
              </p>
              <p>
                Today, Pilates Smederevo continues to evolve, but our core values remain the same: attention to proper form, personalized instruction, and a commitment to helping each client discover their strongest self.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
