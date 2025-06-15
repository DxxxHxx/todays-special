import { ChatResponse } from "@/types/interface/chatResponse";
import { User } from "@/types/interface/user";
import { getUser } from "@/utils/auth/googleAuth";
import axios from "axios";

export async function getMenuRecommendation(
  prompt: string
): Promise<ChatResponse> {
  const systemPrompt = `
당신은 사용자에게 기분과 상황에 맞는 음식 메뉴를 추천해주는 AI입니다.
반드시 아래 형식을 따라 답변하세요:

추천메뉴: [추천할 음식 이름]
<br/>
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

  const [menu, reason] = content.split("<br/>");
  const filteredMenu =
    menu.split("추천메뉴:").length > 1 ? menu.split("추천메뉴:")[1] : "";

  const user = (await getUser()) as User;
  const res = {
    menu: filteredMenu,
    reason: reason ?? "",
    content,
    user: user?.user_metadata.user_name ?? user.user_metadata.name ?? "익명",
    hasMenu: !!filteredMenu, // 메뉴 추천 메세지면 true, 일반 대화형이면 false
  };

  return res;
}
