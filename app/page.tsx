// app/page.tsx
import FaultReportForm from './components/FaultReportForm'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-xl mx-auto px-4 py-10 space-y-8">
        {/* Rubrik */}
        <header className="space-y-3">
          <h1 className="text-2xl font-bold">
            Felanmälan – Keplers Gata 3–31
          </h1>

          <p className="text-gray-700">
            Här kan du som boende enkelt göra en felanmälan om något i
            din lägenhet eller i fastigheten inte fungerar som det ska.
          </p>

          <p className="text-gray-700">
            Felanmälan går direkt till fastighetsskötare som ansvarar
            för huset. Vid behov av kompletterande information
            kontaktar vi dig.
          </p>

          <p className="text-sm text-gray-500">
            Vid akuta fel utanför kontorstid – följ jourinformation som
            finns i trapphuset.
          </p>
        </header>

        {/* Formulär */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">
            Gör en felanmälan
          </h2>

          <p className="text-sm text-gray-600">
            Ju tydligare du beskriver felet, desto snabbare kan vi
            hjälpa till.
          </p>

          <FaultReportForm />
        </section>
      </section>
    </main>
  )
}