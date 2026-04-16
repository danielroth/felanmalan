'use client'

import { useState } from 'react'
import { createTicket } from '@/app/actions/createTicket'

export default function FaultReportForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)

    try {
      await createTicket({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        callFirst: formData.get('callFirst') === 'on',
        keyAccess: formData.get('keyAccess') as
          | 'yes'
          | 'no'
          | 'not_needed',
      })

      setSubmitted(true)
    } catch (err) {
      alert('Något gick fel. Försök igen senare.')
    }

    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="border bg-white p-6 rounded space-y-3">
        <h3 className="font-semibold text-lg">
          Tack! Din felanmälan är mottagen.
        </h3>
        <p>
          Vi har tagit emot din felanmälan och den hanteras av
          fastighetsskötare i turordning. Du har fått ett bekräftelsemail på den e‑postadress du angav, Där finns också en länk där du kan följa statusen på din felanmälan. 
          Har du inte fått någon mail kolla i mappen för skräppost. 
        </p>
        <p className="text-sm text-gray-600">
          Vid behov av kompletterande information kontaktar vi
          dig via e‑post eller telefon.
        </p>
      </div>
    )
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <input
        required
        name="name"
        placeholder="Ditt namn"
        className="w-full border p-3"
      />

      <input
        required
        type="email"
        name="email"
        placeholder="E‑postadress"
        className="w-full border p-3"
      />

      <input
        required
        name="phone"
        placeholder="Telefonnummer"
        className="w-full border p-3"
      />

      <input
        required
        name="address"
        placeholder="Adress / lägenhetsnummer / Plats"
        className="w-full border p-3"
      />

      <input
        required
        name="title"
        placeholder="Titel (kort beskrivning av felet)"
        className="w-full border p-3"
      />

      <textarea
        required
        name="description"
        placeholder="Beskriv felet så tydligt som möjligt."
        rows={4}
        className="w-full border p-3"
      />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="callFirst" />
        Ring gärna innan eventuellt besök
      </label>

      <div className="space-y-2">
        <p className="text-sm font-medium">
          Gå in med huvudnyckel
        </p>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="keyAccess"
            value="yes"
            required
          />
          Ja
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="keyAccess" value="no" />
          Nej
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="keyAccess"
            value="not_needed"
          />
          Nyckel behövs inte
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2"
      >
        {loading ? 'Skickar…' : 'Skicka felanmälan'}
      </button>
    </form>
  )
}