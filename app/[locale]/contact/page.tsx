
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock,Instagram } from "react-feather";
import { ContactForm } from "@/components/ContactForm";

export default async function ContactPage() {

  const t = await getTranslations("ContactPage");
  const tContactInfo = await getTranslations("ContactPage.contactInfo");
  const tLocations = await getTranslations("ContactPage.locations");

  // const studioLocations = [
  //   {
  //     name: "Pilates Smederevo",
  //     address: "Djure Danicica 6, Smederevo (Teretana Zlatan Gym - Sportska hala",
  //     phone: "(+381) 064 1932-069",
  //     email: "biljanazivkovic2411@gmail.com",
  //     hours: "Mon-Fri: 7am-8pm, Sat-Sun: 9am-5pm",
  //     pin: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2837.902252656889!2d20.931291199999997!3d44.66034870000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4750939530efbb99%3A0xae7f7f99ac7a159d!2sGYM%20I%20FITNESS%20KLUB%20ZLATAN!5e0!3m2!1ssr!2srs!4v1747123108706!5m2!1ssr!2srs"
  //   }
  // ];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        
        <div className="mb-12 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {t("description")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">{tContactInfo("title")}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="mr-3 h-5 w-5 text-pink-600 dark:text-pink-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href="mailto:info@pilatesflow.com" 
                        className="text-sm text-gray-700 dark:text-gray-300 hover:underline"
                      >
                        biljanazivkovic2411@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="mr-3 h-5 w-5 text-pink-600 dark:text-pink-400 mt-0.5" />
                    <div>
                      <p className="font-medium">{tContactInfo("phone")}</p>
                      <a 
                        href="tel:+381641932069" 
                        className="text-sm text-gray-700 dark:text-gray-300 hover:underline"
                      >
                        (+381) 064 1932-069
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="mr-3 h-5 w-5 text-pink-600 dark:text-pink-400 mt-0.5" />
                    <div>
                      <p className="font-medium">{tContactInfo("hours")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {tContactInfo("hoursText")}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                  <h3 className="font-semibold mb-3">{tContactInfo("follow")}</h3>
                  <div className="flex space-x-3">
                    <a href="https://www.instagram.com/pilates_smederevo/?utm_source=qr&igsh=MTI0cWhyazVpc25sZw%3D%3D#" target="_blank" className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400">
                      <span className="sr-only">Instagram</span>
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="https://www.facebook.com/pilatesfitnes?rdid=atBzbEXiyOybAYKY&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1E6Biik1xc%2F#" target="_blank" className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{tLocations("title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
              <Card className="overflow-hidden">
                <div className="aspect-video relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {/* Placeholder for a map - in production you'd use a real map integration */}
                  {/*<MapPin className="h-12 w-12 text-gray-400" />*/}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2837.902252656889!2d20.931291199999997!3d44.66034870000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4750939530efbb99%3A0xae7f7f99ac7a159d!2sGYM%20I%20FITNESS%20KLUB%20ZLATAN!5e0!3m2!1ssr!2srs!4v1747123108706!5m2!1ssr!2srs"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">{tLocations("studioName")}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="mr-3 h-4 w-4 text-pink-600 dark:text-pink-400 mt-1" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{tLocations("studioAddress")}</p>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="mr-3 h-4 w-4 text-pink-600 dark:text-pink-400 mt-1" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">(+381) 064 1932-069</p>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="mr-3 h-4 w-4 text-pink-600 dark:text-pink-400 mt-1" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">biljanazivkovic2411@gmail.com</p>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="mr-3 h-4 w-4 text-pink-600 dark:text-pink-400 mt-1" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{tLocations("studioHours")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">{t('faq.title')}</h2>
          <div className="space-y-4">
              {t.raw('faq.questions').map((item: {question: string; answer: string;}, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
      
     
    </div>
  );
}