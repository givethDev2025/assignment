import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req) {
  const { prompt, history = [] } = await req.json()
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

  const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' })

  // Build the context string
  const context = history
    .map((entry) => `User: ${entry.question}\nAI: ${entry.answer}`)
    .join('\n') + `\nUser: ${prompt}\nAI:`

  const maxRetries = 3
  let attempt = 0

  while (attempt < maxRetries) {
    try {
      const result = await model.generateContent([context]) 
      const response = await result.response
      const text = response.text()
      return Response.json({ text })
    } catch (err) {
      if (err.message.includes('503') && attempt < maxRetries - 1) {
        console.warn(`Retrying Gemini (attempt ${attempt + 1})...`)
        await new Promise((res) => setTimeout(res, 1000 * (attempt + 1)))
        attempt++
      } else {
        console.error('Gemini error:', err)
        return Response.json(
          { error: 'Gemini API is currently unavailable. Please try again later.' },
          { status: 503 }
        )
      }
    }
  }
}
