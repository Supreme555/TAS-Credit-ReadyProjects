const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});

const resultsDir = path.join(__dirname, 'results');
if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
}

app.post('/api', async (req, res) => {
    try {
        const { input } = req.body;
        console.log('Received input:', input.vin);
        console.log('Received input:', input.checkType);
        const msg = await takeVinInfo(input);
        res.json({ message: msg });
    } catch (e) {
        console.error('Error:', e);
        res.status(500).json({ error: e.message });
    }
});

async function takeVinInfo(input) {
    const { checkType: selected, vin: vin_code } = input;

    const data = {
        type: selected,
        vin: vin_code,
        token: '5253086751893185135a861b75e831da',
    };

    const url = `https://api-cloud.ru/api/gibdd.php?${new URLSearchParams(data).toString()}`;

    try {
        const response = await axios.get(url, {
            timeout: 120000, // Timeout 120 seconds
        });

        const timestamp = Date.now(); // Получаем текущее время в миллисекундах
        const fileName = `result_${selected}_${timestamp}.json`;
        const filePath = path.join(__dirname, 'results', fileName);

        // Запись данных в файл
        fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));

        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении данных: ${error}`);
        return null;
    }
}

