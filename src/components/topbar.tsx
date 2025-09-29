import { Button } from "../components/ui/button"
import { Menu } from "lucide-react"

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">All Applications</h2>
        </div>
      </div>
    </header>
  )
}
