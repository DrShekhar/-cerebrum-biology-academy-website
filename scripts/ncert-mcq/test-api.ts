import * as dotenv from 'dotenv'
dotenv.config()

import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY || ''
console.log('OpenAI API Key length:', apiKey.length)
console.log('OpenAI API Key prefix:', apiKey.substring(0, 15))

async function test() {
  try {
    const client = new OpenAI({ apiKey })

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 50,
      messages: [{ role: 'user', content: 'Say hello in one word' }],
    })

    console.log('Response:', JSON.stringify(response.choices[0], null, 2))
  } catch (error: any) {
    console.error('Error:', error.message)
    if (error.status) {
      console.error('Status:', error.status)
    }
  }
}

test().catch(console.error)
