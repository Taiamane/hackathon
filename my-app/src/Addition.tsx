import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface FormData {
  category: string;
  curriculum: string;
  title: string;
  link: string;
  description: string;
}

const DirectInputForm: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [curriculum, setCurriculum] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [summary,setSummary] = useState<string>("");
  const [made_day, setMade_day] = useState<string>();
  const [updated_day, setUpdated_day] = useState<string>("");
  const [formData, setFormData] = useState<FormData[]>([]);


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    var currentDay = new Date();
    var dateString = currentDay.toString();
    setMade_day(dateString)
    // フォームの内容を使用して必要なアクションを実行
    // バックエンドにリクエストを送信
  try {
    const response = await fetch('http://localhost:8080', {
      method: 'POST', // POSTリクエストを送信（HTTPメソッドを適切に設定）
      headers: {
        'Content-Type': 'application/json', // リクエストヘッダーを適切に設定
      },
      body: JSON.stringify({
        category,
        curriculum,
        title,
        link,
        summary,
        made_day
        

    }), // フォームデータをJSON文字列に変換
    }
  );

    if (response.status === 200) {
      fetchUsers();
      console.log('POSTリクエストが成功しました');
    } else {
      console.error('POSTリクエストが失敗しました');
    }

   
  } catch (error) {
    // リクエストエラーの処理
    console.error('リクエストエラー:', error);
  }

    
  };
  const fetchUsers = async()=>{
    try{
      const getResponse = await fetch("http://localhost:8080",{
        method: "GET",
        headers:{
          "Content-Type":"application/json",
        },
      });

      if (getResponse.status === 200) {
        // GETリクエストの結果を処理
        const formdata = await getResponse.json();
        setFormData(formdata);
        // formDataを適切に処理するコードをここに追加
      } else {
        // GETリクエストが失敗した場合の処理
        console.error("GETリクエストが失敗しました");
      }
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    fetchUsers();
  },[]);

  const handlechangecurriculum = (e:any) => {
    setCurriculum(e.label);
  };

  const handlechangecategory = (e:any) => {
    setCategory(e.label);
  };

  return (
    <form> 
{/* onSubmit={handleSubmit}> */}
      <div>
        <label>カテゴリ:</label>
        <select
          name="category"
          value={category}
          onChange={handlechangecategory}
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
          value={curriculum}
          onChange={handlechangecurriculum}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>リンク:</label>
        <input
          type="text"
          name="link"
          value={link}
          onChange={(e)=> setLink(e.target.value)}
        />
      </div>
      <div>
        <label>概要説明:</label>
        <textarea
          name="summeary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <button type="submit">送信</button>
    </form>
  );
};

export default DirectInputForm;
