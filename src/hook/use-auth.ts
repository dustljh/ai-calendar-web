import supabase from "@/lib/supabase";
import { useAuthStore } from "@/storage";
import { useEffect } from "react";


export default function useAuthListener() {
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        const checkSession = async () => {
            // 현재 세션 정보를 비동기적으로 가져옵니다.
            const {
                data: { session },
            } = await supabase.auth.getSession();

            // 세션과 사용자 정보가 존재하면,
            if (session?.user) {
                // 전역 상태에 사용자 정보를 업데이트합니다.
                // TypeScript 환경이므로 role과 email은 string으로 단언(assertion) 처리합니다.
                setUser({
                    id: session.user.id,
                    email: session.user.email!,
                    role: session.user.role!,
                });
            }
            // 세션이 없다면 setUser(null)을 할 필요는 없습니다. 리스너가 처리할 것입니다.
        };

        // 초기 세션 확인 함수를 즉시 호출합니다.
        checkSession();
        
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            // session이 유효하면 (로그인 상태)
            if (session?.user) {
                // 전역 상태 업데이트: 로그인 성공
                setUser({
                    id: session.user.id,
                    email: session.user.email!,
                    role: session.user.role!,
                });
            } else {
                // session이 null이면 (로그아웃 상태 또는 세션 만료)
                // 전역 상태를 null로 설정하여 로그아웃 처리합니다.
                setUser(null);
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        }
    }, [])
}