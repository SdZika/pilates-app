import { Card, CardContent } from "@/components/ui/card";
import { weeklySchedule } from "@/constants/weeklySchedule";

export function WeeklyScheduleTable() {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
          Weekly Class Times
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-800 text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <tr>
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Time Slots</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(weeklySchedule).map(([day, times]) => (
                <tr
                  key={day}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    {day}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {times.length > 0 ? times.join(", ") : "No classes"}
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