import { CircleArrowUp } from "lucide-react";

function AiCalendarEmptyUI() {
  return (
    <main className="mx-auto w-full h-screen max-w-[1328px] flex pt-20 p-6 gap-6 overflow-hidden">

      {/* 1. 사이드바 */}
      <div className="hidden lg:block w-60 shrink-0 h-full">
        <div className="w-full h-full border rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-sm text-gray-400 p-4 text-center">
          과거 여행 내역이 없습니다.
        </div>
      </div>

      {/* 2. 메인 섹션 */}
      <section className="flex-1 flex flex-col h-full justify-center items-center">
        {/* 안내 문구 */}
        <div className="w-full max-w-2xl mx-auto text-center mb-10  duration-700">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">어디로 떠나고 싶으신가요?</h1>
          <p className="text-lg text-muted-foreground">
            목적지, 여행 기간, 원하는 테마를 알려주시면<br />
            AI가 완벽한 맞춤형 일정을 짜드릴게요.
          </p>
        </div>

        {/* 채팅 입력창 영역 */}
        <div className="w-full max-w-2xl mx-auto">
          <form className="relative group">
            <textarea
              placeholder="예: 제주도 3박 4일 미식 여행 일정 짜줘!"
              className="w-full min-h-[80px] p-5 pr-16 border-2 rounded-3xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none resize-none shadow-xl transition-all text-lg"
            />
            <button
              type="button"
              className="absolute right-4 bottom-4 p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-md"
            >
              <CircleArrowUp size={28} />
            </button>
          </form>
        </div>

      </section>
    </main>
  );
}

export default AiCalendarEmptyUI;