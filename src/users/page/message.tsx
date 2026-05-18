import Layout from '../../../client/components/ui/Layout'

export default function MessagePage() {
    return (
        <>
            <Layout>
                <div className="space-y-8">
                    <header>
                        <h1>MESSAGES</h1>
                        <p className='text-muted-foreground text-lg mt-2'>
                            Chat with your BOT AI
                        </p>
                    </header>

                    <main className=' min-h-screen flex flex-col text-center justify-center mx-auto items-center gap-3'>
                        <h1>FITUR MASIH DALAM PROSES</h1>
                        <p className='text-md text-muted-foreground uppercase'>The AI chatbot feature for messages is still in the testing phase</p>
                    </main>
                </div>
            </Layout>
        </>
    )
}
