import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EmailPreview() {
  const date = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-600">Your Week in Gratitude 🌱</h1>
        <p className="text-gray-500">{formattedDate}</p>
      </div>

      <p className="text-gray-700 mb-6">
        Hello Jane,
        <br />
        <br />
        Here are some highlights from your gratitude journal this week. We hope reflecting on these moments brings you
        joy.
      </p>

      <div className="space-y-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md text-emerald-700">Meaningful Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 italic">
              "I'm grateful for my friend who called just to check in on me today."
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md text-emerald-700">Simple Pleasures</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 italic">
              "I'm grateful for the peaceful morning coffee ritual that helps me start each day centered."
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md text-emerald-700">Natural Beauty</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 italic">"I'm grateful for the beautiful sunset I witnessed on my way home."</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-medium text-blue-800 mb-2">Weekly Reflection</h2>
        <p className="text-gray-700">
          This week, you expressed gratitude for both meaningful connections and quiet moments of solitude. This balance
          suggests you value both social connection and personal reflection time.
        </p>
      </div>

      <div className="text-center text-gray-500 text-sm">
        <p>
          You're receiving this because you enabled weekly summaries in your Gratitude app settings.
          <br />
          <a href="#" className="text-emerald-600 hover:underline">
            Manage email preferences
          </a>
        </p>
      </div>
    </div>
  )
}
