import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  const trainers = [
    {
      name: "Jane Smith",
      role: "Lead Pilates Instructor",
      bio: "Jane has been teaching Pilates for over 10 years and is certified in both mat and reformer Pilates. She specializes in rehabilitation and pre/post-natal Pilates.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Michael Johnson",
      role: "Pilates & Yoga Instructor",
      bio: "Michael brings his background in dance and physical therapy to create dynamic and mindful Pilates sequences that focus on building core strength and flexibility.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Sarah Williams",
      role: "Reformer Specialist",
      bio: "Sarah is our Pilates reformer expert with extensive knowledge in using equipment to enhance the traditional Pilates experience for all fitness levels.",
      image: "/api/placeholder/300/300"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          About PilatesFlow
        </h1>
        
        <div className="mb-12 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            PilatesFlow is a premium Pilates studio dedicated to helping you achieve your fitness goals through mindful movement and expert instruction.
          </p>
          <div className="aspect-video relative overflow-hidden rounded-xl mb-8">
            <Image 
              src="/api/placeholder/800/400" 
              alt="PilatesFlow Studio" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 text-center">Mind-Body Connection</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We believe in strengthening the connection between mind and body for overall wellness and improved quality of life.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 text-center">Personalized Approach</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Every body is different, which is why we tailor our instruction to meet your unique needs and goals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 text-center">Supportive Community</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We foster a welcoming environment where members feel supported and inspired to achieve their best.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Trainers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainers.map((trainer) => (
              <Card key={trainer.name} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image 
                    src={trainer.image} 
                    alt={trainer.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-1">{trainer.name}</h3>
                  <p className="text-pink-600 dark:text-pink-400 text-sm mb-3">{trainer.role}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{trainer.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Studio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <div className="aspect-video relative">
                <Image 
                  src="/api/placeholder/600/400" 
                  alt="Studio Equipment" 
                  fill 
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">State-of-the-Art Equipment</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our studio features premium Pilates reformers, towers, chairs, and other specialized equipment to enhance your practice.
                </p>
              </CardContent>
            </Card>
            <Card>
              <div className="aspect-video relative">
                <Image 
                  src="/api/placeholder/600/400" 
                  alt="Studio Space" 
                  fill 
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Tranquil Environment</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Designed with serenity in mind, our space provides the perfect atmosphere for focusing on your practice and wellness journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Story</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Founded in 2018, PilatesFlow began with a simple mission: to create a space where people of all fitness levels could experience the transformative power of Pilates in a supportive, non-intimidating environment.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                What started as a small studio with just two reformers has grown into a thriving community dedicated to mindful movement and holistic wellness. Our instructors bring diverse backgrounds in dance, physical therapy, and athletics to create a unique approach to Pilates that honors traditional methods while embracing innovation.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Today, PilatesFlow continues to evolve, but our core values remain the same: attention to proper form, personalized instruction, and a commitment to helping each client discover their strongest self.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}