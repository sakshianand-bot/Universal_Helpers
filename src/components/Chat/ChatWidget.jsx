import React, { useState, useRef, useEffect } from 'react'

export default function ChatWidget(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([]) // only user messages for now
  const [text, setText] = useState('')
  const endRef = useRef(null)

  useEffect(()=>{
    if(endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function send(){
    if(!text.trim()) return
    setMessages(m => [...m, { from: 'user', text: text.trim(), id: Date.now() }])
    setText('')
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div className="flex flex-col items-end">
        {open && (
          <div className="w-80 md:w-96 bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden mb-3 border">
            <div className="px-4 py-3 bg-gradient-to-r from-red-900 to-black text-white flex items-center justify-between">
              <div className="font-semibold">Assistant</div>
              <button onClick={()=>setOpen(false)} aria-label="Close chat" className="text-white/80 hover:text-white">✕</button>
            </div>

            <div className="p-3 h-56 overflow-auto bg-gray-50 dark:bg-slate-900" style={{scrollBehavior:'smooth'}}>
              {messages.length === 0 && (
                <div className="text-sm text-gray-500">No messages yet. Type your question below and press Send.</div>
              )}

              {messages.map((m)=> (
                <div key={m.id} className="mt-2">
                  <div className="text-right">
                    <span className="inline-block bg-red-600 text-white px-3 py-2 rounded-md">{m.text}</span>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t bg-gray-50 dark:bg-slate-900">
              <div className="flex gap-2">
                <input
                  value={text}
                  onChange={(e)=>setText(e.target.value)}
                  onKeyDown={(e)=>{ if(e.key === 'Enter') send() }}
                  className="flex-1 px-3 py-2 rounded-md border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                  placeholder="Type your question..."
                />
                <button onClick={send} className="px-3 py-2 rounded-md bg-gradient-to-r from-red-600 to-black text-white hover:from-red-700 hover:to-black transition-colors">Send</button>
              </div>
              <div className="mt-2 text-xs text-gray-500">Note: no backend configured — messages are local only.</div>
            </div>
          </div>
        )}

        <button
          onClick={()=>setOpen(o=>!o)}
          aria-label="Open chat"
          className="rounded-full bg-gradient-to-r from-red-600 to-black text-white w-14 h-14 flex items-center justify-center shadow-lg hover:from-red-700 hover:to-black transition-colors"
        >
          {open ? '–' : '💬'}
        </button>
      </div>
    </div>
  )
}
