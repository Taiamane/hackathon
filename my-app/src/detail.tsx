// DetailPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface ApiItem {
  category?: string;
  curriculum?: string;
  title?: string;
  link?: string;
  summary?: string;
  made_day?: string;
  updated_day?: string;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<ApiItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ダミーデータを取得するためのAPIエンドポイントを適切なものに置き換える
        const response = await fetch(`http://localhost:8080/user?id=${id}`);
        
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }

        const data: ApiItem = await response.json();
        setItem(data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    // 削除処理を実行するためのAPIエンドポイントを適切なものに置き換える
    try {
      await fetch(`http://localhost:8080/user/${id}`, {
        method: 'DELETE',
      });

      // 削除成功後、トップページにリダイレクト
      navigate('/');
    } catch (error) {
      console.error('削除に失敗しました:', error);
    }
  };

  const handleEdit = async () => {
    // 編集処理を実行するためのAPIエンドポイントを適切なものに置き換える
    try {
      const response = await fetch(`http://localhost:8080/user/${id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // ここに編集したいデータをJSON形式で送信
        body: JSON.stringify({ updated_day: new Date().toISOString() }),
      });

      if (!response.ok) {
        throw new Error('編集に失敗しました');
      }

      // 編集成功後、トップページにリダイレクト
      navigate('/');
    } catch (error) {
      console.error('編集に失敗しました:', error);
    }
  };

  if (!item) {
    return <p>Loading...</p>; // データがロード中の場合の表示
  }

  return (
    <div>
      <h2>{item.title}</h2>
      <p>Category: {item.category}</p>
      <p>Curriculum: {item.curriculum}</p>
      <p>Link: {item.link}</p>
      <p>Summary: {item.summary}</p>
      <p>Made Day: {item.made_day}</p>
      <p>Updated Day: {item.updated_day}</p>
      
      {/* 削除ボタン */}
      <button onClick={handleDelete}>削除</button>
      
      {/* 編集ボタン */}
      <button onClick={handleEdit}>編集</button>
      
      {/* 他に表示したいデータがあれば追加 */}
    </div>
  );
};

export default DetailPage;
