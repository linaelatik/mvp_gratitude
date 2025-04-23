"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Entries() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  )

  const handlePreviousMonth = () => {
    const date = new Date(currentMonth + " 1")
    date.setMonth(date.getMonth() - 1)
    setCurrentMonth(date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))
  }

  const handleNextMonth = () => {
    const date = new Date(currentMonth + " 1")
    date.setMonth(date.getMonth() + 1)
    setCurrentMonth(date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))
  }

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/entries')
        const data = await response.json()
        setEntries(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching entries:', error)
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

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
                  <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <h2 className="text-lg font-medium text-gray-700">{currentMonth}</h2>
                  <Button variant="outline" size="sm" onClick={handleNextMonth}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                {loading ? (
                  <div>Loading entries...</div>
                ) : (
                  <div className="space-y-4">
                    {entries.map((entry) => (
                      <Card key={entry.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                        <CardContent className="p-4">
                          <p className="text-gray-700">{entry.content}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="calendar" className="mt-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-6">
                    <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <h2 className="text-lg font-medium text-gray-700">{currentMonth}</h2>
                    <Button variant="outline" size="sm" onClick={handleNextMonth}>
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
                    {Array.from({ length: 1 }).map((_, i) => (
                      <div key={`empty-start-${i}`} className="h-12 rounded-md"></div>
                    ))}

                    {Array.from({ length: 30 }).map((_, i) => {
                      const day = i + 1
                      const hasEntries = entries.some(entry => 
                        new Date(entry.created_at).getDate() === day &&
                        new Date(entry.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) === currentMonth
                      )

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
