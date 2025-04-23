"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Save, Sparkles } from "lucide-react"
import { StressReliefModal } from "@/components/stress-relief-modal"

const placeholders = [
  "A moment of laughter",
  "A conversation that lifted me up",
  "Something beautiful I saw today",
  "A small act of kindness",
  "Something I'm looking forward to",
  "A challenge I overcame",
  "Someone who inspires me",
  "A skill I'm grateful to have",
  "A comfort I often take for granted",
  "A memory that makes me smile",
]

export default function Dashboard() {
  const [entries, setEntries] = useState<string[]>(Array(3).fill(""))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleAddEntry = () => {
    if (entries.length < 10) {
      setEntries([...entries, ""])
    }
  }

  const handleEntryChange = (index: number, value: string) => {
    const newEntries = [...entries]
    newEntries[index] = value
    setEntries(newEntries)
  }

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-blue-50 to-green-50">
      <Sidebar />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Today&apos;s Gratitude</h1>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Feeling Stressed?
              </Button>
            </div>

            <p className="text-gray-600 mb-6">{today}</p>

            <div className="space-y-4">
              {entries.map((entry, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-4">
                    <Textarea
                      placeholder={`I'm grateful for... ${placeholders[index % placeholders.length]}`}
                      className="border-0 focus-visible:ring-0 resize-none min-h-[100px] bg-transparent placeholder:text-gray-400"
                      value={entry}
                      onChange={(e) => handleEntryChange(index, e.target.value)}
                    />
                  </CardContent>
                </Card>
              ))}

              {entries.length < 10 && (
                <Button
                  variant="outline"
                  className="w-full py-8 border-dashed border-2 text-gray-500 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50"
                  onClick={handleAddEntry}
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add another gratitude
                </Button>
              )}

              <div className="flex justify-end mt-6">
                <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700" disabled={isSaving}>
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save entries
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <StressReliefModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
