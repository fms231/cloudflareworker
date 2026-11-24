interface TerminalLine {
  command: string
  output: string
}

const terminalCommands: TerminalLine[] = [
  { command: 'whoami', output: 'quito - Backend Developer' },
  { command: 'uptime', output: 'coding since 2019 and counting...' },
]

function Terminal() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-700 bg-neutral-950 text-sm text-neutral-200 shadow-lg shadow-neutral-950/10">
      <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-yellow-400" />
          <span className="size-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-neutral-400">quito@blog ~</span>
      </div>
      <div className="space-y-3 p-4 font-mono text-xs leading-6 sm:p-5">
        {terminalCommands.map((line) => (
          <div key={line.command} className="grid gap-x-2 sm:grid-cols-[auto_auto_1fr]">
            <span className="text-green-400">$</span>
            <span className="text-cyan-300">{line.command}</span>
            <span className="text-neutral-400">{line.output}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Terminal
