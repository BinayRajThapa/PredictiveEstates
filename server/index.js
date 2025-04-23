import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PythonShell } from 'python-shell';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);
app.post('/api/predict', (req, res) => {
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: `${__dirname}`,
    args: [JSON.stringify(req.body)],
  };

  let pyshell = new PythonShell('predict.py', options);

  pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
    res.send(message); // send the result back to the frontend
  });

  // end the input stream and allow the process to exit
  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
  });
});
