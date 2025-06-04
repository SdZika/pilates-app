import { Card, CardContent } from "@/components/ui/card";
import { weeklySchedule } from "@/constants/weeklySchedule";
import { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/i18n";

interface Props {
  locale: Locale;
}

export async function WeeklyScheduleTable({locale}: Props) {

  const dictionary = await getDictionary(locale)
  const t = dictionary.Schedule;

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
          {t.titleTable}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-800 text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <tr>
                <th className="px-4 py-2">{t.day}</th>
                <th className="px-4 py-2">{t.timeSlots}</th>
              </tr>
            </thead>
            <tbody>
                  {Object.entries(weeklySchedule).map(([dayKey, dayData]) => (
                <tr
                  key={dayKey}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    {dayData[locale]}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {dayData.times.length > 0
                      ? dayData.times.join(", ")
                      : t.noClasses}
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