import { useEffect, useState } from 'react'
import { Button } from './components/ui';
import supabase from './lib/supabase';
import { useAuthStore } from './storage';
import { useNavigate } from 'react-router-dom';

function App() {
  // 회원가입 전용 상태
  const navigate = useNavigate();

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // 로그인 전용 상태
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [test, setTest] = useState("");

  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  const [drafts, setDrafts] = useState<any[]>([]);

  const fetchDrafts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('userContant') // 새로 만든 테이블 이름으로 변경
        .select("id, test, email")
        .eq('user_id', user.id); // user_id 컬럼으로 필터링

      if (error) {
        console.error("데이터 조회 실패:", error.message);
      }

      if (data) {
        setDrafts(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user) fetchDrafts();
    else setDrafts([]);
  }, [user]);

  const onSubmitSignUpNewUser = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
      });

      if (error) {
        console.error(error);
        return;
      }

      console.log("회원가입 성공:", data.user);
      setSignUpEmail("");
      setSignUpPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitLoginUser = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setUser({
          id: data.user.id,
          email: data.user.email as string,
          role: data.user.role as string,
        })
      }

      console.log("로그인 성공", data.user.id);
      console.log("로그인 성공", data.user.email);
      console.log("로그인 성공", data.user.role);
      console.log("로그인 성공", data.user);
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      console.error(error);
    }
  }

  const pushText = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      // 변수 중복 선언 방지를 위해 바로 할당
      const { data, error } = await supabase
        .from('userContant') // 테이블 이름 확인 (userContant)
        .insert([
          {
            user_id: user.id, // Supabase Auth의 유저 ID
            test: test,        // 입력 필드의 텍스트
            email: user.email
          },
        ])
        .select();

      if (error) {
        console.error("데이터 저장 실패:", error.message);
        return;
      }

      console.log("저장 완료:", data);
      setTest("");    // 입력창 초기화
      fetchDrafts();  // 화면 갱신
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className='flex flex-col items-center justify-center'>
      <h2>회원가입</h2>
      <form className='mb-7' onSubmit={onSubmitSignUpNewUser}>
        <div>
          <label>이메일</label>
          <input
            type="email"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
          />
        </div>

        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
          />
        </div>
        <Button type="submit" variant="outline">회원가입</Button>
      </form>
      <form onSubmit={onSubmitLoginUser}>
        <h2>로그인</h2>
        <div>
          <label>이메일</label>
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>

        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <Button type="submit" variant="outline">로그인</Button>
      </form>

      <form onSubmit={pushText}>
        <div>
          <label>입력값</label>
          <input
            type="text"
            value={test}
            onChange={(e) => setTest(e.target.value)}
          />
        </div>
        <Button type="submit" variant="outline">저장</Button>
      </form>
      <div>
        <h2>입력확인</h2>
        {drafts.length > 0 ? (
          drafts.map((item) => (
            <p
              key={item.id} // index 대신 고유한 item.id를 사용하는 것이 좋습니다.
              onClick={() => navigate(`/detail/${item.id}`)} // 클릭 시 이동
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} // 클릭 가능한 UI 힌트
            >
              {item.email}: {item.test}
            </p>
          ))
        ) : (
          <p>저장된 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default App
