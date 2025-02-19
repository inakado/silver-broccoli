import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const objects = [
  {
    name: "Laser Lemonade Machine",
    status: "Draft",
  },
  {
    name: "Hypernova Headphones",
    status: "Active",
  },
  {
    name: "AeroGlow Desk Lamp",
    status: "Active",
  },
  {
    name: "TechTonic Energy Drink",
    status: "Draft",
  },
  {
    name: "Gamer Gear Pro Controller",
    status: "Active",
  },
  {
    name: "Luminous VR Headset",
    status: "Active",
  },
]

export default function ObjectList() {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium mb-4">Объекты</h2>
      <p className="text-sm text-muted-foreground mb-6">Manage your products and view their sales performance</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {objects.map((object) => (
            <TableRow key={object.name}>
              <TableCell>{object.name}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    object.status === "Active" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {object.status}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-sm text-muted-foreground mt-4">Showing 1-10 of 32 products</div>
    </div>
  )
}

