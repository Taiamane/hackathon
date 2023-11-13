//ログイン後のトップ画面

import React,{ useState } from 'react';
import { fireAuth } from "./firebase";
import { useNavigate } from "react-router-dom"; // useHistoryをインポート
import { signOut } from "firebase/auth";
import Delete from './Delete';


import './Homepage.css';

import DirectInputForm from './Addition';

interface ApiItem {
  category?: string;
  curriculum?: string;
  title?: string;
  link?: string;
  summary?: string;
  made_day?: string;
  updated_day?: string;
}

interface EditFormProps {
  item: ApiItem;
  onSave: (updatedItem: ApiItem) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ item, onSave, onCancel }) => {
  const [editedItem, setEditedItem] = useState<ApiItem>(item);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditedItem({ ...editedItem, [event.target.name]: event.target.value });
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedItem({ ...editedItem, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 現在の日時を取得して updated_day に設定（時間まで含む）
    const now = new Date();
    const updatedDateTime = now.toISOString(); // "YYYY-MM-DDTHH:mm:ss.sssZ" 形式
  
    // 秒までの情報を含む部分を抽出
    const updatedDate = updatedDateTime.substring(0, 19); // "YYYY-MM-DDTHH:mm:ss" 形式に変換
  
    onSave({ ...editedItem, updated_day: updatedDate });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={editedItem.title || ''} onChange={handleInputChange} placeholder="タイトル" />
      <input type="text" name="category" value={editedItem.category || ''} onChange={handleInputChange} placeholder="カテゴリ" />
      <input type="text" name="curriculum" value={editedItem.curriculum || ''} onChange={handleInputChange} placeholder="カリキュラム" />
      <input type="text" name="link" value={editedItem.link || ''} onChange={handleInputChange} placeholder="リンク" />
      <textarea name="summary" value={editedItem.summary || ''} onChange={handleTextareaChange} placeholder="要約"></textarea>
      <input type="text" name="updated_day" value={editedItem.updated_day || ''} onChange={handleInputChange} placeholder="更新日" />
      <input type="text" name="made_day" value={editedItem.made_day || ''} onChange={handleInputChange} placeholder="作成日" />
      <span>←変更しないでください</span>

      <button type="submit">保存</button>
      <button type="button" onClick={onCancel}>キャンセル</button>
    </form>
  );
};



const Homepage: React.FC = () => {
  const navigate = useNavigate(); // useHistoryを初期化

  const handleLogout = async () => {
    try {
      await signOut(fireAuth);
      alert("ログアウトしました");
      navigate('/'); // ログアウト後に指定のURLにリダイレクト
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      
      <button className="right" onClick={handleLogout}>ログアウト</button>
      <Userinfo/>

      <h2>Homepage</h2>
      <Delete/>
      <SearchForm/>
      
    </div>
  );
};

export default Homepage;

const Userinfo: React.FC = () => {
  const user = fireAuth.currentUser;
  

  return (
    <div>
      {user ? (
        <p className='right'>{`メールアドレス: ${user.email}`}</p>
      ) : (
        <p className='right'>ユーザーはログインしていません</p>
      )}
    </div>
  );
};

export const SearchForm: React.FC = () =>{
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const handleEditClick = (itemId: string) => {
    setEditingItemId(itemId);
  };

  const navigate = useNavigate(); // useHistoryを初期化
  const [visibleSummaryId, setVisibleSummaryId] = useState<string | null>(null);

  const [editingItem, setEditingItem] = useState<ApiItem | null>(null);
  const handleSave = (updatedItem: ApiItem) => {
    const backendUrl = `http://localhost:8080/items/${updatedItem.made_day}`; // 編集するアイテムのIDに基づくURL
  
    fetch(backendUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.status === 204 ? Promise.resolve({}) : response.json();
    })
    .then(() => {
      // 成功した場合、状態を更新してリストを再レンダリング
      const updatedData = tableData.map((item) => 
        item.made_day === updatedItem.made_day ? updatedItem : item
      );
      setTableData(updatedData);
      setEditingItem(null);
    })
    .catch((error) => {
      console.error("編集リクエストエラー:", error);
    });
  };
  
  const [tableData, setTableData] = useState<ApiItem[]>([]);
  const [sortKey, setSortKey] = useState<'made_day' | 'updated_day'>('made_day');
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(event.target.value as 'made_day' | 'updated_day');
  };

  const Addition: React.FC = () => {
    // フォームの表示状態を管理するための状態
    const [isFormOpen, setIsFormOpen] = useState(false);
  
    // ボタンをクリックしてフォームを開く関数
    const openForm = () => {
      setIsFormOpen(true);
    };
  
    // フォームを閉じる関数
    const closeForm = () => {
      setIsFormOpen(false);
    };
  
    return (
      <div>
        <button onClick={openForm}>コンテンツ追加</button>
        {isFormOpen && (
          <div>
            {/* ここに追加用のフォームのコンポーネントを配置 */}
            <DirectInputForm/>
            <form>            
              <button onClick={closeForm}>閉じる</button>
            </form>
          </div>
        )}
      </div>
    );
  };

  const [selectedGenre, setSelectedGenre] = useState('');
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const [selectedcurriculum, setselectedCurriculum] = useState('');
  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedCurriculum(event.target.value);
  };

  const [response,setResponse] = useState('');

  const sendResearch = () => {
    
    //以下、検索をかけた時の処理
    const category = selectedGenre;
    const curriculum = selectedcurriculum;
    const backendUrl = 'http://localhost:8080/'; // このURLを実際のバックエンドエンドポイントに置き換え
    
    fetch(backendUrl,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a: ApiItem, b: ApiItem) =>
        (a[sortKey] ?? '').localeCompare(b[sortKey] ?? '')
        );

        setTableData(sortedData); // レスポンスメッセージを表示
      })
      .catch((error) => {
        console.error('リクエストエラー:', error);
        setResponse('リクエストエラーが発生しました。');
      });
  };
  function renderListItem(item:ApiItem) {
    return (
      <li key={item.made_day}>
        <p>Category: {item.category}</p>
        <p>Curriculum: {item.curriculum}</p>
        <p>Title: {item.title}</p>
        <p>Link: {item.link}</p>
        <p>Made Day: {item.made_day}</p>
        <p>Updated Day: {item.updated_day}</p>
        <button onClick={() => item.made_day && setVisibleSummaryId(item.made_day)}>詳細</button>
        {visibleSummaryId === item.made_day && <p>Summary: {item.summary}</p>}
        <button onClick={() => setEditingItemId(item.made_day || null)}>編集</button>
        {editingItemId === item.made_day && (
          <EditForm item={item} onSave={handleSave} onCancel={() => setEditingItemId(null)} />
        )}
      </li>
    );
  }

  return(
    <div>
      <p>カテゴリ選択</p>
      <form name="form1">
        <select name="genres" id="" value={selectedGenre} onChange={handleGenreChange}>
          <option value=""></option>
          <option value="技術ブログ">技術ブログ</option>
          <option value="技術書">技術書</option>
          <option value="技術系動画">技術系動画</option>
        </select>
      </form>
      <p>カリキュラム選択</p>
      <form name="form2">
        <select name="items" id="" value={selectedcurriculum} onChange={handleItemChange}>
          <option value=""></option>
          <option value="OSコマンドとシェル">OSコマンドとシェル</option>
          <option value="Git">Git</option>
          <option value="GitHub">GitHub</option>
          <option value="HTML&CSS">HTML&CSS</option>
          <option value="Javascript">Javascript</option>
          <option value="React">React</option>
          <option value="Typescript">Typescript</option>
          <option value="SQL">SQL</option>
          <option value="docker">Docker</option>
          <option value="Go">Go</option>
          <option value="HTTPServer">HTTPServer</option>
          <option value="RDBMSへの接続">RDBMSへの接続</option>
          <option value="UnitTest">UnitTest</option>
          <option value="フロントとバックの接続">フロントとバックの接続</option>
          <option value="CI">CI</option>
          <option value="CD">CD</option>
          <option value="認証">認証</option>
        </select>
        </form>
        <label>
        ソートキー：
        <select value={sortKey} onChange={handleSortChange}>
          <option value="made_day">ID（作成日時）</option>
          <option value="updated_day">Updated Day</option>
        </select>
      </label>
      <button onClick={sendResearch}>検索</button>
      <ul>
  {tableData.map((item) => {
    // 両方の条件が指定されている場合、両方に一致するアイテムを表示
    if (selectedcurriculum && selectedGenre) {
      if (item.curriculum === selectedcurriculum && item.category === selectedGenre) {
        return renderListItem(item);
      }
    }
    // 一方のみが指定されている場合、その条件に一致するアイテムを表示
    else if (selectedcurriculum || selectedGenre) {
      if (selectedcurriculum && item.curriculum === selectedcurriculum) {
        return renderListItem(item);
      }
      if (selectedGenre && item.category === selectedGenre) {
        return renderListItem(item);
      }
    }
    // どちらの条件も指定されていない場合、全てのアイテムを表示
    else {
      return renderListItem(item);
    }
    return null;
  })}
</ul>
      <Addition/>
    </div>
  );
};