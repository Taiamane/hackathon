// EditPage.tsx

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

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<ApiItem | null>(null);
  const [editedItem, setEditedItem] = useState<ApiItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ダミーデータを取得するためのAPIエンドポイントを適切なものに置き換える
        const response = await fetch(`https://example.com/api/items?id=${id}`);
        
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }

        const data: ApiItem = await response.json();
        setItem(data);
        setEditedItem(data); // 編集フォームの初期値として設定
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = async () => {
    // 編集処理を実行するためのAPIエンドポイントを適切なものに置き換える
    try {
      const response = await fetch(`https://example.com/api/items/${id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // ここに編集したいデータをJSON形式で送信
        body: JSON.stringify(editedItem),
      });

      if (!response.ok) {
        throw new Error('編集に失敗しました');
      }

      // 編集成功後、元の詳細ページにリダイレクト
      navigate(`/detail/${id}`);
    } catch (error) {
      console.error('編集に失敗しました:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  if (!item) {
    return <p>Loading...</p>; // データがロード中の場合の表示
  }

  return (
    <div>
      <h2>Edit Item</h2>
      <form>
        <label>
          Title:
          <input type="text" name="title" value={editedItem?.title || ''} onChange={handleInputChange} />
        </label>
        {/* 他の編集可能なフィールドも同様に追加 */}
        <button type="button" onClick={handleEdit}>編集完了</button>
      </form>
    </div>
  );
};

export default EditPage;
