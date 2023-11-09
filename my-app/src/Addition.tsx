import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  category: string;
  curriculum: string;
  title: string;
  link: string;
  description: string;
}

const DirectInputForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    category: '',
    curriculum: '',
    title: '',
    link: '',
    description: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // フォームの内容を使用して必要なアクションを実行
    // バックエンドにリクエストを送信
  try {
    const response = await fetch('https://example.com/api/endpoint', {
      method: 'POST', // POSTリクエストを送信（HTTPメソッドを適切に設定）
      headers: {
        'Content-Type': 'application/json', // リクエストヘッダーを適切に設定
      },
      body: JSON.stringify(formData), // フォームデータをJSON文字列に変換
    });

    if (response.ok) {
      // リクエストが成功した場合の処理
      console.log('リクエストが成功しました');
    } else {
      // エラーレスポンスの処理
      console.error('リクエストが失敗しました');
    }
  } catch (error) {
    // リクエストエラーの処理
    console.error('リクエストエラー:', error);
  }

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>カテゴリ:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="">選択してください</option>
          <option value="技術ブログ">技術ブログ</option>
          <option value="技術書">技術書</option>
          <option value="技術系動画">技術系動画</option>
        </select>
      </div>
      <div>
        <label>カリキュラム:</label>
        <select
          name="curriculum"
          value={formData.curriculum}
          onChange={handleInputChange}
        >
          <option value="">選択してください</option>
          <option value="OSコマンドとシェル">OSコマンドとシェル</option>
          <option value="Git">Git</option>
          <option value="GitHub">GitHub</option>
          {/* 他のカリキュラムの選択肢を追加 */}
        </select>
      </div>
      <div>
        <label>タイトル:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>リンク:</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>概要説明:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">送信</button>
    </form>
  );
};

export default DirectInputForm;


//リクエスト内容は後で入力