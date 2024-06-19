import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from '../assets/VinComp.module.css'
function VinComp() {

  const ApiTxt = '<table class="table table-striped" id="result"><small><i>*данные по ДТП с начала 2015 года.</i></small><tbody><tr><th>Время проишествия</th><th>24.09.2015 19:30</th></tr><tr><td>Место проишествия</td><td>Свердловская область</td></tr><tr><td>Тип проишествия</td><td>Столкновение</td></tr><tr><td>Места повреждений</td><td><img class="img-responsive" src="http://check.gibdd.ru/proxy/check/auto/images/cache/08.png"></td></tr><tr><td>Марка автомобиля</td><td>FORD</td></tr><tr><td>Модель автомобиля</td><td>Explorer</td></tr><tr><td colspan="2">Данные актуальны на 18.06.2024 11:41</td></tr><tr><td colspan="2">Поделиться результатом:<div disabled="" class="ya-share2" data-description="Машина учавствовала в ДТП проверил это бесплатно на сайте https://vin01.ru/" data-services="vkontakte,facebook,odnoklassniki,moimir,viber,whatsapp,telegram" data-title:viber="Машина учавствовала в ДТП проверил это бесплатно на сайте https://vin01.ru/" data-title:whatsapp="Машина учавствовала в ДТП проверил это бесплатно на сайте https://vin01.ru/" data-title:telegram="Машина учавствовала в ДТП проверил это бесплатно на сайте https://vin01.ru/"></div></td></tr><script src="https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js"></script><script src="https://yastatic.net/share2/share.js" async="async"></script></tbody></table>'

  const [vin, setVin] = useState('1FMEU73EX6UB13848');
  const [checkType, setCheckType] = useState('dtp');
  const [responseMessage, setResponseMessage] = useState('Поиск по VIN номеру');
  // const [responseMessage, setResponseMessage] = useState(ApiTxt);
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
    <div className={styles.main}>
      <h2 className={styles.title}>Введите VIN автомобиля (Vin01)</h2>
      <div className={styles.inputs}>
        <input type="text" id="vinInput" placeholder="VIN автомобиля" value={vin} onChange={handleInputChange} />
        <select className={styles.formControl} id="checkType" value={checkType} onChange={handleOptionChange}>
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
        <button onClick={() => { Search() }}>Поиск</button>
      </div>
      <div className={styles.output} id="outputElement">
        {/* <p>{responseMessage ? responseMessage : 'Загрузка...'}</p> */}
        <div className={styles.outputTable} dangerouslySetInnerHTML={{ __html: `${responseMessage ? responseMessage : 'Загрузка...'}` }}></div>
      </div>
    </div>
  )
}

export default VinComp

'<table class="table table-striped" id="result"><small><i>*данные по ДТП с начала 2015 года.</i></small><tbody><tr><th>Время проишествия</th><th>24.09.2015 19:30</th></tr><tr><td>Место проишествия</td><td>Свердловская область</td></tr><tr><td>Тип проишествия</td><td>Столкновение</td></tr><tr><td>Места повреждений</td><td><img class="img-responsive" src="http://check.gibdd.ru/proxy/check/auto/images/cache/08.png"></td></tr><tr><td>Марка автомобиля</td><td>FORD</td></tr><tr><td>Модель автомобиля</td><td>Explorer</td></tr><tr><td colspan="2">Данные актуальны на 18.06.2024 11:41</td></tr><tr><td colspan="2">Поделиться результатом:<div disabled="" class="ya-share2" data-description="Машина учавствовала в ДТП проверил это бесплатно на сайте https://vin01.ru/" data-services="vkontakte,facebook,odnoklassniki,moimir,viber,whatsapp,telegram" data-title:viber="Машина учавствовала в ДТП проверил это бесплатно на сайте https://vin01.ru/" data-title:whatsapp="Машина учавствовала в ДТП проверил это бесплатно на сайте https://vin01.ru/" data-title:telegram="Машина учавствовала в ДТП проверил это бесплатно на сайте https://vin01.ru/"></div></td></tr><script src="https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js"></script><script src="https://yastatic.net/share2/share.js" async="async"></script></tbody></table>'