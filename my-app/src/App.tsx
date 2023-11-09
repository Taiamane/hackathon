//ログイン画面&サインアップ画面

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { fireAuth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { useEffect, useState } from 'react';
import React from 'react';

import './App.css';

import { Routes, Route, useNavigate } from "react-router-dom";
import Homepage from './Homepage';


const App = () => {
  const navigate = useNavigate();
  // stateとしてログイン状態を管理する。ログインしていないときはnullになる。
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
  
  // ログイン状態を監視して、stateをリアルタイムで更新する
  onAuthStateChanged(fireAuth, user => {
    setLoginUser(user);
  });

  useEffect(() => {
    if(loginUser){
      navigate('/Homepage');
    }
  },[loginUser,navigate]);
  

  
  
  return (
    <div>
      <Routes>
        <Route path="/Homepage" element= {<Homepage />} />
        {/* 他のルート設定もここに追加できます */}
      </Routes>
    <div>
    {loginUser ? null :<NewLoginForm/> }
    {loginUser ? null : <SignupForm/>}
    {/*loginUser ? <LogoutButton/> :null*/}
    
    {/* ログインしていないと見られないコンテンツは、loginUserがnullの場合表示しない */}
    {/*loginUser ? <Contents /> : null*/} 
    </div>
  </div>
    
  );
};

export default App;

export const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(fireAuth, email, password);
      const user = userCredential.user;
      alert('サインアップユーザー: ' + user.email);
    } catch (error) {
      const errorMessage = "エラーが発生しました"
      alert(errorMessage);
    }
  };

  return (
    <div>
      <h2>サインアップ</h2>
      <input type="email" placeholder="メールアドレス" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="パスワード" value={password} onChange={handlePasswordChange} />
      <button onClick={handleSignup}>サインアップ</button>
    </div>
  );
};

export const LogoutButton: React.FC = () =>{

  const SignoutWithemailandpw = (): void => {
    signOut(fireAuth).then(() => {
      alert("ログアウトしました");
    }).catch(err => {
      alert(err);
    });
  };
  return(
  <button onClick={SignoutWithemailandpw}>
        ログアウト
  </button>
  )   
}


export const NewLoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(fireAuth, email, password);
      const user = userCredential.user;
      alert('ログインユーザー: ' + user.email);
    } catch (error) {
      const errorMessage = "エラーが発生しました"
      alert(errorMessage);
    }
  };
  
  

  return (
    <div>
      <h2>ログイン</h2>
      <input type="email" placeholder="メールアドレス" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="パスワード" value={password} onChange={handlePasswordChange} />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export const LoginForm: React.FC = () => {
  /**
   * googleでログインする
   */
  const signInWithGoogle = (): void => {
    // Google認証プロバイダを利用する
    const provider = new GoogleAuthProvider();

    // ログイン用のポップアップを表示
    signInWithPopup(fireAuth, provider)
      .then(res => {
        const user = res.user;
        alert("ログインユーザー: " + user.displayName);
      })
      .catch(err => {
        const errorMessage = err.message;
        alert(errorMessage);
      });
  };

  /**
   * ログアウトする
   */
  const signOutWithGoogle = (): void => {
    signOut(fireAuth).then(() => {
      alert("ログアウトしました");
    }).catch(err => {
      alert(err);
    });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>
        Googleでログイン
      </button>
      <button onClick={signOutWithGoogle}>
        ログアウト
      </button>
    </div>
  );/*自習用にGoogleの方も残します */
};

const Contents: React.FC = () => {
  return (
    <div>
      <p>正常にログインできています</p>
    </div>
  );
};