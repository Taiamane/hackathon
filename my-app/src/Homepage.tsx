//ログイン後のトップ画面

import React from 'react';
import { fireAuth } from "./firebase";
import { useNavigate } from "react-router-dom"; // useHistoryをインポート
import { signOut } from "firebase/auth";

import './Homepage.css';

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
      <p>ここ以下に「アイテム検索」のメニューを作る</p>
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
