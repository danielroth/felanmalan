import { serve } from "https://deno.land/std/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { email, title } = await req.json()

    if (!email || !title) {
      return new Response("Missing fields", {
        status: 400,
        headers: corsHeaders,
      })
    }

    const token = Deno.env.get("POSTMARK_API_TOKEN")
    const from = Deno.env.get("MAIL_FROM")

    await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": token!,
      },
      body: JSON.stringify({
        From: from,
        To: email,
        Subject: `Ditt ärende är avslutat: ${title}`,
        TextBody: `
Hej!

Vi har nu åtgärdat och avslutat ditt ärende:

"${title}"

Om problemet kvarstår eller om du har fler frågor är du varmt välkommen att kontakta oss igen.

Vänliga hälsningar  
Fastighetsförvaltningen
        `.trim(),
      }),
    })

    return new Response("Mail sent", { headers: corsHeaders })
  } catch (err) {
    console.error(err)
    return new Response("Error", { status: 500, headers: corsHeaders })
  }
})
