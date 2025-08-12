import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { PhoneCall } from "react-feather";
import Link from "next/link";

export default async function PriceListPage() {
  const t = await getTranslations("PriceList");

  // Price data
  const prices = [
    {
      id: "free",
      title: t("firstTraining"),
      description: t("firstTrainingDesc"),
      price: t("freePrice"),
      highlight: true,
      action: t("callToBook"),
      icon: <PhoneCall size={16} />,
    },
    {
      id: "single",
      title: t("singleTraining"),
      description: t("singleTrainingDesc"),
      price: "500 RSD",
    },
    {
      id: "eight",
      title: t("eightTrainings"),
      description: t("eightTrainingsDesc"),
      price: "2600 RSD",
    },
    {
      id: "twelve",
      title: t("twelveTrainings"),
      description: t("twelveTrainingsDesc"),
      price: "3000 RSD",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 pt-20">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Heading */}
        <section className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {t("heading")}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </section>

        {/* Desktop Table */}
        <section className="hidden md:block mb-8">
          <Card>
            <CardContent className="p-6">
              <table className="min-w-full border border-gray-200 dark:border-gray-800 text-sm text-left rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                  <tr>
                    <th className="px-4 py-3">{t("trainingType")}</th>
                    <th className="px-4 py-3">{t("descriptionColumn")}</th>
                    <th className="px-4 py-3">{t("priceColumn")}</th>
                  </tr>
                </thead>
                <tbody>
                  {prices.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`${
                        idx % 2 === 0
                          ? "bg-white dark:bg-gray-900"
                          : "bg-gray-50 dark:bg-gray-950"
                      } hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                        {item.title}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {item.description}
                        {item.highlight && (
                          <Link href="/contact" className="ml-2 inline-flex items-center gap-1 text-pink-600 dark:text-pink-400 font-medium">
                            {item.icon} {item.action}
                          </Link>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-semibold">
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>

        {/* Mobile Cards */}
        <section className="space-y-4 md:hidden">
          {prices.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {item.price}
                  </span>
                  {item.highlight && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {item.icon}
                      {item.action}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
