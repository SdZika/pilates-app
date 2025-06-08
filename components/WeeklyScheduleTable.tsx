import { Card, CardContent } from "@/components/ui/card";

interface T {
  t: {
    titleTable: string;
    day: string;
    timeSlots: string;
    noClasses: string;
    days: Record<string, string>;
    times: Record<string, string[]>;
  };
}

export async function WeeklyScheduleTable({ t }: T) {
  const orderedDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
              {orderedDays.map((day) => {
                const translatedDay = t.days[day];
                const timeSlots = t.times[day] || [];

                return (
                  <tr
                    key={day}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                      {translatedDay}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {timeSlots.length > 0
                        ? timeSlots.join(", ")
                        : t.noClasses}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
