//ログイン後のトップ画面

import React from 'react';
import { fireAuth } from "./firebase";
import { useNavigate } from "react-router-dom"; // useHistoryをインポート
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

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
      <h2>Other Page</h2>
      <p>This is the other page.</p>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Homepage;
