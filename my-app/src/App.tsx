import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { fireAuth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { useState } from 'react';
import React from 'react';

import './App.css';


const App = () => {
  // stateとしてログイン状態を管理する。ログインしていないときはnullになる。
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
  
  // ログイン状態を監視して、stateをリアルタイムで更新する
  onAuthStateChanged(fireAuth, user => {
    setLoginUser(user);
  });
  
  return (
    <>
      <NewLoginForm/>
      <SignupForm/>
      {/* ログインしていないと見られないコンテンツは、loginUserがnullの場合表示しない */}
      {loginUser ? <Contents /> : null} 
    </>
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
  const SignoutWithemailandpw = (): void => {
    signOut(fireAuth).then(() => {
      alert("ログアウトしました");
    }).catch(err => {
      alert(err);
    });
  };
  

  return (
    <div>
      <h2>ログイン</h2>
      <input type="email" placeholder="メールアドレス" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="パスワード" value={password} onChange={handlePasswordChange} />
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={SignoutWithemailandpw}>
        ログアウト
      </button>
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