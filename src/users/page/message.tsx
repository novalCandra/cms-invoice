import { Send } from 'lucide-react'
import Layout from '../../../client/components/ui/Layout'
import { useEffect, useRef, useState } from 'react';
interface MessageType {
    id: string;
    sender: "user" | "client";
    clientName: string;
    clientInitial: string;
    text: string;
}

interface SocketMessage {
    type: "chat" | "assistant" | "error";
    content: string;
}

export default function MessagePage() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [newMessage, setMessage] = useState<string>("")
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {

        const socket = new WebSocket(`wss://api-invoice-sandy.vercel.app/`);
        socketRef.current = socket

        // socket.onopen = () => {
        //     console.log("connected")
        // }

        socket.onmessage = (e) => {
            const data: SocketMessage = JSON.parse(e.data);
            if (data.type === "assistant") {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        sender: "client",
                        clientName: "Ai Asistent",
                        clientInitial: "AI",
                        text: data.content,
                    }
                ]);
            }

            if (data.type === "error") {
                console.error(data.content)
            }
        }

        socket.onclose = () => {
            console.log("disconented")
        }

        socket.onerror = (error) => {
            console.error(error)
        }

        return () => {
            socket.close()
        }
    }, [])

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newMessage.trim()) return

        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            return console.error("is connected")
        }

        const message = {
            type: "chat",
            content: newMessage
        }

        // Send Back end
        socketRef.current.send(JSON.stringify(message))

        // Intermedial display users
        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                sender: "user",
                clientName: "you",
                clientInitial: "YOU",
                text: newMessage
            }
        ])
        setMessage("")
    }
    return (
        <Layout>
            <div className="space-y-8">
                <header>
                    <h1>MESSAGES</h1>
                    <p className='text-muted-foreground text-lg mt-2'>
                        Chat with your BOT AI
                    </p>
                </header>

                <div className="flex-1 border-4 border-border h-[30rem] bg-background p-6 overflow-y-auto space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex gap-4 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                            {/* Avatar */}
                            <div className={`w-10 h-10 flex-shrink-0 border-2 border-border flex items-center justify-center font-black text-xs ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                                {message.sender === "user" ? "YOU" : message.clientInitial}
                            </div>

                            {/* message */}
                            <div className={`flex-1 max-w-md ${message.sender === "user" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground"}`}>
                                <div className={`border-2 border-border p-4 ${message.sender === "user" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground"}`}>
                                    <p className='font-bold text-xs uppercase text-opacity-70 mb-2'>
                                        {message.sender === "user" ? "YOU" : message.clientName}
                                    </p>
                                    <p className='text-sm font-semibold'>{message.text ?? "tidak ada pesan"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={sendMessage} className='border-t-4 border-border pt-4'>
                    <div className='flex gap-4'>
                        <input
                            type='text'
                            value={newMessage}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='How can i help to today'
                            className='flex-1 px-4 py-3 border-2 border-border bg-background text-foreground font-bold'
                        />
                        <button type='submit' className='px-6 py-3 bg-primary text-primary-foreground border-2 border-primary font-black uppercase hover:text-background transition-all flex items-center gap-3'>
                            <Send size={20} /> SEND
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
