import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';

interface UserContent {
    id: string;
    email: string;
    test: string;
}

export default function DetailPage() {
    const { id } = useParams(); // URL에서 id 추출
    const [data, setData] = useState<UserContent | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            const { data, error } = await supabase
                .from('userContant')
                .select('*')
                .eq('id', id)
                .single();
            if(error){
                console.error(error);
            }
            if (data) setData(data);

        };
        fetchDetail();
    }, [id]);

    if (!data) return <div>로딩 중...</div>;

    return (
        <div>
            <h1>상세 내용</h1>
            <p>작성자: {data.email}</p>
            <p>내용: {data.test}</p>
        </div>
    );
}