import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';

const systemPrompt = `你是一位专业的梦境分析师，擅长通过心理学和象征主义解读梦境。
请按照以下 JSON 格式返回分析结果（确保返回的是有效的 JSON 字符串）：

{
  "analysis": "详细的梦境分析",
  "symbols": ["象征1", "象征2", "象征3"],
  "emotions": ["情绪1", "情绪2", "情绪3"],
  "tags": ["标签1", "标签2", "标签3"]
}

分析时需要考虑以下几个方面：
1. 梦境中的主要象征和隐喻
2. 可能反映的心理状态
3. 现实生活中的关联
4. 建议和启示

请用温和、专业的语气给出分析，避免过于武断或消极的解读。`;

export async function POST(request: Request) {
  try {
    const { dream } = await request.json();

    if (!dream?.trim()) {
      return NextResponse.json(
        { error: '请提供梦境描述' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API configuration missing' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey,
    });

    const messages = [
      {
        role: "system" as const,
        content: systemPrompt
      },
      {
        role: "user" as const,
        content: `请分析以下梦境：\n\n${dream}`
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 1000
    });

    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error('No response from OpenAI');
    }

    try {
      // 尝试解析返回的 JSON 字符串
      const parsedResult = JSON.parse(result);
      return NextResponse.json(parsedResult);
    } catch (parseError) {
      // 如果解析失败，返回格式化的错误响应
      return NextResponse.json({
        analysis: result,
        symbols: [],
        emotions: [],
        tags: []
      });
    }

  } catch (error) {
    console.error('Dream analysis error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : '分析梦境时出现错误',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}