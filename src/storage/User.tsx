import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string; //로그인된 사용자 이메일 저장
}

interface UserStore {
  user: User | null;
  setUser: (newUser: User | null) => void;
  reset: () => void;
}

export const useAuthStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null, //처음 사용자 상태를 null
      setUser: (newUser) => set({ user: newUser }), //값을 받아와서 로그인 상태 유지
      reset: () => set({ user: null }), //저장된 유저 값을 초기화
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);