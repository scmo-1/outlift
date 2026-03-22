import type { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'

type LogInputProps = {
  label: string
  inputValue: number
  onChange: (value: number) => void
  onIncrement: () => void
  onDecrement: () => void
  step?: number
}

function LogInput({
  label,
  inputValue,
  onChange,
  onIncrement,
  onDecrement,
  step = 1,
}: LogInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value)

    if (Number.isNaN(nextValue)) {
      onChange(0)
      return
    }

    onChange(nextValue)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <Input type="number" step={step} value={inputValue} onChange={handleChange} />
      <div className="flex gap-2">
        <Button type="button" size="icon-lg" variant="outline" onClick={onDecrement}>
          <Minus />
        </Button>
        <Button type="button" size="icon-lg" variant="outline" onClick={onIncrement}>
          <Plus />
        </Button>
      </div>
    </div>
  )
}

export default LogInput
