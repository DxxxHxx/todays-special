export async function getMenuRecommendation(prompt: string): Promise<{
  menu: string;
  reason: string;
}> {
  const systemPrompt = `당신은 사용자에게 기분과 상황에 맞는 음식 메뉴를 추천해주는 AI입니다. 메뉴 이름과 간단한 추천 이유를 제공하세요.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    }),
  });

  const data = await res.json();
  //   console.log(data);

  // 예시 응답 파싱
  const content: string = data.choices?.[0]?.message?.content || "";
  const [menu, ...rest] = content.split("\n").filter(Boolean);
  //   console.log(menu, rest);
  const reason = rest.join(" ").replace(/^[-:\s]+/, "");

  return {
    menu: menu.replace(/^[-:\s]+/, ""),
    reason,
  };
}
