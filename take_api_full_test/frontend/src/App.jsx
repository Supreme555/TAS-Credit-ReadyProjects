import React, { useState, useEffect } from 'react'
import axios from 'axios';
function App() {
  const [vin, setVin] = useState('12VFT80N575300154');
  const [checkType, setCheckType] = useState('dtp');
  const [responseMessage, setResponseMessage] = useState('Поиск по VIN номеру');
  const handleOptionChange = (event) => {
    setCheckType(event.target.value);
  };
  const handleInputChange = (event) => {
    setVin(event.target.value);
  };

  const Search = async () => {
    setResponseMessage('');
    try {
      const { data } = await axios.post('http://localhost:3000/api', { input: { vin, checkType } });
      setResponseMessage(data.message);
      console.log('status 200');
    } catch (error) {
      setResponseMessage('Не удалось получить данные с сервера! Пожалуйста, повторите запрос позднее.');
      console.error('status 400', error);
    }
  };

  return (
    <main>
      <div className="main">
        <h2>Введите VIN автомобиля</h2>
        <div className="inputs">
          <input type="text" id="vinInput" placeholder="VIN автомобиля" value={vin} onChange={handleInputChange} />
          <select className="form-control" id="checkType" value={checkType} onChange={handleOptionChange}>
            <option value="history">История регистраций</option>
            <option value="dtp">История ДТП</option>
            <option value="wanted">Розыск ТС</option>
            <option value="restrict">Наличие ограничений</option>
            <option value="diagnostic">Пройденные ТО и пробег (ГИБДД)</option>
            <option value="taxi">Использование в такси</option>
            <option value="zalog">Реестр залогов</option>
            <option value="sud">Поиск судебных решений</option>
            {/* <option value="telegram">Телеграм бот</option>
            <option value="full_report">Полный отчёт</option> */}
          </select>
        </div>

        <button onClick={() => { Search() }}>Поиск</button>

        <div className="output" id="outputElement">
          <p>{responseMessage ? responseMessage : 'Загрузка...'}</p>
        </div>

      </div>
    </main>
  )
}

export default App
