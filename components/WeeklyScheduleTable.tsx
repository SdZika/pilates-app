import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";


export async function WeeklyScheduleTable() {

  const t = await getTranslations("Schedule");
  const times = t.raw("times");
  const days = t.raw("days");

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
          {t("titleTable")}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-800 text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <tr>
                <th className="px-4 py-2">{t("day")}</th>
                <th className="px-4 py-2">{t("timeSlots")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(times).map(([day, slots]) => (
                <tr
                  key={day}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    {days[day] ?? day}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {Array.isArray(slots) && slots.length > 0
                      ? slots.join(", ")
                      : t("noClasses")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}