import { TypeHeaderDashboard } from "../../types/type.ts"
export default function HeaderDashboard({ prossHeaderDashboard, propsHeaderDeskripsion, propsHeaderButton, actionButton }: TypeHeaderDashboard) {
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1>{prossHeaderDashboard}</h1>
                    <p className="text-muted-foreground text-lg mt-2">{propsHeaderDeskripsion}</p>
                </div>
                <button onClick={actionButton} className="bg-primary text-primary-foreground border-2 border-primary px-8 py-4 font-black text-lg hover:bg-foreground hover:text-background transition-all flex items-center gap-2 w-full md:w-auto">
                    {propsHeaderButton}
                </button>
            </div>
        </>
    )
}
