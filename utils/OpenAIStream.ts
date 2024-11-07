import OpenAI from "openai";

const openai = new OpenAI();

export async function OpenAIStream(payload: OpenAI.ChatCompletionCreateParams) {
  const completion = await openai.chat.completions.create({
    model: payload.model,
    messages: payload.messages,
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of completion) {
        const content = chunk.choices[0].delta.content;
        if (content) {
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });

  return stream;
}
