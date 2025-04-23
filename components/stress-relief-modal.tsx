"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BriefcaseIcon, HeartIcon, ActivityIcon } from "lucide-react"

// Sample past entries that would normally come from a database
const pastEntries = {
  work: [
    {
      date: "April 18, 2025",
      entry: "I'm grateful for my supportive team at work who helped me finish the project on time.",
      reflection: "Your colleagues are a source of strength for you. Remember to lean on them when challenges arise.",
    },
  ],
  relationships: [
    {
      date: "April 15, 2025",
      entry:
        "I'm grateful for the long phone call with my sister today. It reminded me how much I value our connection.",
      reflection: "Family connections provide you with emotional support and a sense of belonging.",
    },
  ],
  health: [
    {
      date: "April 20, 2025",
      entry: "I'm grateful for the morning walk I took today. The fresh air and movement helped clear my mind.",
      reflection: "Physical activity is a powerful tool for managing stress and improving your mood.",
    },
  ],
}

interface StressReliefModalProps {
  isOpen: boolean
  onClose: () => void
}

export function StressReliefModal({ isOpen, onClose }: StressReliefModalProps) {
  const [selectedTab, setSelectedTab] = useState("work")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Take a Moment</DialogTitle>
          <DialogDescription className="text-center">
            Select what's causing stress, and we'll remind you of moments of gratitude that might help.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="work" value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="work" className="flex items-center">
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Work</span>
            </TabsTrigger>
            <TabsTrigger value="relationships" className="flex items-center">
              <HeartIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Relationships</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center">
              <ActivityIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Health</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="work" className="mt-4 space-y-4">
            {pastEntries.work.map((entry, index) => (
              <EntryCard key={index} entry={entry} />
            ))}
          </TabsContent>

          <TabsContent value="relationships" className="mt-4 space-y-4">
            {pastEntries.relationships.map((entry, index) => (
              <EntryCard key={index} entry={entry} />
            ))}
          </TabsContent>

          <TabsContent value="health" className="mt-4 space-y-4">
            {pastEntries.health.map((entry, index) => (
              <EntryCard key={index} entry={entry} />
            ))}
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-4">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface Entry {
  date: string
  entry: string
  reflection: string
}

function EntryCard({ entry }: { entry: Entry }) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md bg-white/80">
      <CardContent className="p-4">
        <div className="text-sm text-gray-500 mb-2">{entry.date}</div>
        <div className="text-gray-700 mb-4 italic">"{entry.entry}"</div>
        <div className="p-3 bg-blue-50 rounded-md text-blue-800 text-sm">
          <span className="font-medium">Reflection:</span> {entry.reflection}
        </div>
      </CardContent>
    </Card>
  )
}
