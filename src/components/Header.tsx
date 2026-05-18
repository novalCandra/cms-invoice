import { TypeHeaderAauth } from "../../types/type.ts"

export default function Header({ propsJudul, propsDeskipsi }: TypeHeaderAauth) {
    return (
        <>
            <header>
                <div className="mb-12 text-center border-b-4 border-border pb-8 space-y-3">
                    <h1 className='text-5xl text-black'>{propsJudul}</h1>
                    <p className='text-muted-foreground font-bold uppercase text-sm'>
                        {propsDeskipsi}
                    </p>
                </div>
            </header>
        </>
    )
}
