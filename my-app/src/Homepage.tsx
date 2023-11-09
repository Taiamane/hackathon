//ログイン後のトップ画面

import React,{ useState } from 'react';
import { fireAuth } from "./firebase";
import { useNavigate } from "react-router-dom"; // useHistoryをインポート
import { signOut } from "firebase/auth";

import './Homepage.css';

import DirectInputForm from './Addition';

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
            <form>
              <DirectInputForm/>
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

  const [curriculum, setCurriculum] = useState('');
  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurriculum(event.target.value);
  };

  const [response,setResponse] = useState('');

  const sendResearch = () => {
    //以下、検索をかけた時の処理
    const selectedGenreValue = selectedGenre;
    const curriculumValue = curriculum;
    const backendUrl = 'https://example.com/api/some-endpoint'; // このURLを実際のバックエンドエンドポイントに置き換え

    // GETリクエストを送信
    fetch(backendUrl)
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.message); // レスポンスメッセージを表示
      })
      .catch((error) => {
        console.error('リクエストエラー:', error);
        setResponse('リクエストエラーが発生しました。');
      });
  };

  return(
    <div>
      <p>カテゴリ選択</p>
      <form name="form1">
        <select name="genres" id="" value={selectedGenre} onChange={handleGenreChange}>
          <option value=""></option>
          <option value="blogs">技術ブログ</option>
          <option value="books">技術書</option>
          <option value="movies">技術系動画</option>
        </select>
      </form>
      <p>カリキュラム選択</p>
      <form name="form2">
        <select name="items" id="" value={curriculum} onChange={handleItemChange}>
          <option value=""></option>
          <option value="item1">OSコマンドとシェル</option>
          <option value="item2">Git</option>
          <option value="item3">GitHub</option>
          <option value="item4">HTML&CSS</option>
          <option value="item5">Javascript</option>
          <option value="item6">React</option>
          <option value="item7">Typescript</option>
          <option value="item8">SQL</option>
          <option value="item9">Docker</option>
          <option value="item10">Go</option>
          <option value="item11">HTTPServer</option>
          <option value="item12">RDBMSへの接続</option>
          <option value="item13">UnitTest</option>
          <option value="item14">フロントとバックの接続</option>
          <option value="item15">CI</option>
          <option value="item16">CD</option>
          <option value="item17">認証</option>
        </select>
        </form>
      <button onClick={sendResearch}>検索</button>
      <Addition/>
    </div>
  );
};


