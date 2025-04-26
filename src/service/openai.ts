import axios from "axios";

export async function getMenuRecommendation(prompt: string): Promise<{
  menu: string;
  reason: string;
}> {
  const systemPrompt = `
당신은 사용자에게 기분과 상황에 맞는 음식 메뉴를 추천해주는 AI입니다.
반드시 아래 형식을 따라 답변하세요:

추천메뉴: [추천할 음식 이름]
이유: [간단한 추천 이유]

예시:
추천메뉴: 국밥
<br/>
이유: 든든하고 따뜻해서 비 오는 날에 잘 어울립니다.
`;

  const { data } = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  // 예시 응답 파싱
  const content: string = data.choices?.[0]?.message?.content || "";
  // const [menu, ...rest] = content.split("\n").filter(Boolean);
  console.log(`content : ${content}`);
  // console.log(menu, rest);
  // const reason = rest.join(" ").replace(/^[-:\s]+/, "");

  const [menu, reason] = content.split("<br/>");
  const filteredMenu =
    menu.split("추천메뉴:").length > 1 ? menu.split("추천메뉴:")[1] : "";

  console.log(filteredMenu);
  return {
    menu: filteredMenu,
    reason,
  };
}
