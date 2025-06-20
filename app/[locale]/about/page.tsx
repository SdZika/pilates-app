import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {

  const t = await getTranslations("About")
  const tStudio = t.raw("studio")
  const tPhilosophy = t.raw("philosophy")
  const tTrainersList = t.raw("trainersList")
  const tStory = t.raw("story")

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Intro */}
        <section className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">{t("title")}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t("description")}
          </p>
          <div className="aspect-video relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/background_studio.webp"
              alt="PilatesFlow Studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
              quality={90}
              priority
            />
          </div>
        </section>

        {/* Philosophy */}
        <section>
          <h2 className="text-2xl font-bold mb-10 text-center">{t("philosophyTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tPhilosophy.map((item: { title: string; desc: string }) => (
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
          <h2 className="text-2xl font-bold mb-10 text-center">{t("trainersTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tTrainersList.map((trainer: {id: string; name: string; image: string; role: string; bio: string;}) => (
              <Card id={`trainer-${trainer.id}`} key={trainer.name} className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition">
                <div className="aspect-square relative">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
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
          <h2 className="text-2xl font-bold mb-10 text-center">{t("studioTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tStudio.map((item: { title: string; desc: string; image: string; }) => (
              <Card key={item.title} className="rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="pt-6 space-y-2">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story */}
        <section>
          <h2 className="text-2xl font-bold mb-10 text-center">{t("storyTitle")}</h2>
          <Card className="rounded-2xl shadow-md">
            <CardContent className="pt-6 space-y-4 text-gray-700 dark:text-gray-300 text-sm">
              {tStory.map((item: string, index: number) => (
                <p key={index}>
                  {item}
              </p>))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
