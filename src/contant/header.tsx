import { useAuthStore } from "@/storage"

function Header() {
    const user = useAuthStore((state) => state.user);

    return (
        <div>
            StrictMode
            <div>
                {user ? user.email : "회원가입"}
            </div>
        </div>

    )
}

export { Header }