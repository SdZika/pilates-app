import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { Calendar } from "react-feather";

export async function WeeklyScheduleTable() {
  const t = await getTranslations("Schedule");
  const times = t.raw("times");
  const days = t.raw("days");

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
          {t("titleTable")}
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-800 text-sm text-left rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <tr>
                <th className="px-4 py-3">{t("day")}</th>
                <th className="px-4 py-3">{t("timeSlots")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(times).map(([day, slots], idx) => (
                <tr
                  key={day}
                  className={`${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-950"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    {days[day] ?? day}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {Array.isArray(slots) && slots.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {slots.map((slot, i) => (
                          <Badge key={i} variant="secondary">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="flex items-center gap-2 text-gray-400">
                        <Calendar size={16} />
                        {t("noClasses")}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {Object.entries(times).map(([day, slots]) => (
            <div
              key={day}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900 shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {days[day] ?? day}
              </h3>
              {Array.isArray(slots) && slots.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot, i) => (
                    <Badge key={i} variant="secondary">
                      {slot}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} />
                  {t("noClasses")}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
