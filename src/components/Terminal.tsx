import { useEffect, useState } from 'react'

interface TerminalLine {
  command: string
  output: string
}

const terminalCommands: TerminalLine[] = [
  { command: 'whoami', output: 'quito - Backend Developer' },
  { command: 'cat /etc/stack', output: 'Go | Python | Docker | K8s' },
  { command: 'uptime', output: 'coding since 2019 and counting...' },
  { command: 'echo $FOCUS', output: 'distributed systems & cloud native' },
]

function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [currentCommand, setCurrentCommand] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      setVisibleLines(terminalCommands.length)
      return
    }

    let lineIndex = 0
    let charIndex = 0
    let timeout: ReturnType<typeof setTimeout>

    const typeCommand = () => {
      if (lineIndex >= terminalCommands.length) return

      const cmd = terminalCommands[lineIndex].command

      if (charIndex <= cmd.length) {
        setCurrentCommand(cmd.slice(0, charIndex))
        charIndex++
        timeout = setTimeout(typeCommand, 50 + Math.random() * 40)
      } else {
        setIsTyping(false)
        setTimeout(() => {
          setVisibleLines(lineIndex + 1)
          lineIndex++
          charIndex = 0
          setCurrentCommand('')
          timeout = setTimeout(typeNextCommand, 600)
        }, 200)
      }
    }

    const typeNextCommand = () => {
      if (lineIndex >= terminalCommands.length) return
      setIsTyping(true)
      typeCommand()
    }

    timeout = setTimeout(typeNextCommand, 800)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <span className="terminal-title">quito@blog ~ </span>
      </div>
      <div className="terminal-body">
        {terminalCommands.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="terminal-line">
            <span className="terminal-prompt">$</span>
            <span className="terminal-command">{line.command}</span>
            <span className="terminal-output">{line.output}</span>
          </div>
        ))}
        {visibleLines < terminalCommands.length && (
          <div className="terminal-line terminal-active">
            <span className="terminal-prompt">$</span>
            <span className="terminal-command">{currentCommand}</span>
            {isTyping && <span className="terminal-cursor" />}
          </div>
        )}
      </div>
    </div>
  )
}

export default Terminal
