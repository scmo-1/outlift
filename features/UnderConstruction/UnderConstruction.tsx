'use client'
import Grainient from './components/Grainient'
import Link from 'next/link'

function UnderConstruction() {
  const linkStyles =
    'group relative overflow-hidden border border-accent rounded-md px-4 py-2 uppercase'

  const textStyles =
    'absolute inset-0 flex items-center justify-center text-accent transition-transform duration-500 ease-in-out'

  return (
    <div className="flex flex-col w-full min-h-screen p-5 items-center px-auto">
      <section className="relative w-full h-120 max-w-5xl">
        <Grainient className="z-0" />
        <h1 className="uppercase absolute text-background font-black -bottom-2 -left-1 text-6xl md:text-9xl md:-bottom-5 md:-left-2">
          outlift.
        </h1>
      </section>

      <section className="w-full flex flex-col items-center gap-4 mt-10">
        <p className="font-mono text-lg uppercase">under construction...</p>

        <div className="flex gap-2 font-mono">
          <Link href="https://www.linkedin.com/in/simon-olsson-3a7208173/" className={linkStyles}>
            <span className="opacity-0">linkedin</span>
            <span className={`${textStyles} translate-y-0 group-hover:-translate-y-full`}>
              linkedin
            </span>
            <span className={`${textStyles} translate-y-full group-hover:translate-y-0`}>
              linkedin
            </span>
          </Link>

          <Link href="https://github.com/scmo-1" className={linkStyles}>
            <span className="opacity-0">github</span>
            <span className={`${textStyles} translate-y-0 group-hover:-translate-y-full`}>
              github
            </span>
            <span className={`${textStyles} translate-y-full group-hover:translate-y-0`}>
              github
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default UnderConstruction
