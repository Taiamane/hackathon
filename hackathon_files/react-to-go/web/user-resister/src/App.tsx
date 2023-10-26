import React,{useState, ChangeEvent,useEffect} from 'react';

import './App.css';

interface UserData {
  name: string;
  age: number;
}

function App() {

  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [responseData, setResponseData] = useState<UserData[]>([]);


  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAge(value);
  };

  const handleButtonClick = () => {
    postData(name,age)
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function postData(name:string,age:number){

    
    if (!name) {
      alert("名前を入力してください");
      return;
    }

    if (name.length > 50) {
      alert("50字以下の名前を入力してください");
      return;
    }

    if (age < 20 || age > 80) {
      alert("20から80までの数値を入力してください");
      return;
    }

    const data = {
      name: name,
      age: age,
    };
    try{
      const response = await fetch('http://localhost:8000/user',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('POSTリクエストが成功しました');
        fetchData();
      } else {
        console.error('POSTリクエストが失敗しました');
      }
    } catch (error) {
      console.error('POSTリクエスト時にエラーが発生しました', error);
    }
  }
  
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8000/user',{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
        },
      }); 
  
      if (response.ok) {
        const data = await response.json();
        setResponseData(data); 
      } else {
        console.error('データの取得に失敗しました');
      }
    } catch (error) {
      console.error('データの取得時にエラーが発生しました', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>User resister</p>
      </header>
      <div className="Form">
        <p>Name: <input type="text" value={name} onChange={handleNameChange} /></p>
        <p>Age: <input type="number" value={age} onChange={handleAgeChange} /></p>
        <button onClick={handleButtonClick}>POST</button>
      </div>
      <div>
      {responseData && responseData.map((user, index) => (
        <div key={index} className="UserData">
          <p>名前: {user.name}</p>
          <p>年齢: {user.age}</p>
        </div>
      
      ))}
      </div>
    </div>
  );
}

  


export default App;
