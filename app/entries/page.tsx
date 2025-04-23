"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample entries that would normally come from a database
const sampleEntries = [
  {
    id: 1,
    date: "April 22, 2025",
    entries: [
      "I'm grateful for the peaceful morning coffee ritual that helps me start each day centered.",
      "I'm grateful for my friend who called just to check in on me today.",
      "I'm grateful for the beautiful sunset I witnessed on my way home.",
    ],
  },
  {
    id: 2,
    date: "April 21, 2025",
    entries: [
      "I'm grateful for the delicious homemade meal I enjoyed tonight.",
      "I'm grateful for completing a challenging work project successfully.",
    ],
  },
  {
    id: 3,
    date: "April 20, 2025",
    entries: [
      "I'm grateful for the morning walk I took today. The fresh air and movement helped clear my mind.",
      "I'm grateful for the supportive message from my sister.",
      "I'm grateful for the comfortable bed I get to sleep in each night.",
    ],
  },
]

export default function Entries() {
  const [currentMonth, setCurrentMonth] = useState("April 2025")

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-blue-50 to-green-50">
      <Sidebar />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">My Entries</h1>

            <Tabs defaultValue="list" className="mb-8">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="mt-6">
                <div className="flex items-center justify-between mb-6">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <h2 className="text-lg font-medium text-gray-700">{currentMonth}</h2>
                  <Button variant="outline" size="sm">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {sampleEntries.map((day) => (
                    <div key={day.id}>
                      <h3 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-emerald-600" />
                        {day.date}
                      </h3>
                      <div className="space-y-3">
                        {day.entries.map((entry, index) => (
                          <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                            <CardContent className="p-4">
                              <p className="text-gray-700">{entry}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="mt-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-6">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <h2 className="text-lg font-medium text-gray-700">{currentMonth}</h2>
                    <Button variant="outline" size="sm">
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for days before the month starts */}
                    {Array.from({ length: 1 }).map((_, i) => (
                      <div key={`empty-start-${i}`} className="h-12 rounded-md"></div>
                    ))}

                    {/* Days of the month */}
                    {Array.from({ length: 30 }).map((_, i) => {
                      const day = i + 1
                      const hasEntries = sampleEntries.some((entry) => entry.date.includes(`April ${day}`))

                      return (
                        <div
                          key={`day-${day}`}
                          className={`h-12 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                            hasEntries ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-800" : "hover:bg-gray-100"
                          }`}
                        >
                          {day}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
