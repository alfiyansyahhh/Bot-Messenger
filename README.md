
This project was bootstrapped with
[Bottender](https://github.com/Yoctol/bottender) init script.


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#screenshoot">Screen Shoot</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Simple Bot messenger . Link for live [Demo](http://m.me/botTester421) here.

<p align="right">(<a href="#top">back to top</a>)</p>

### ScreenShoot

gif|screenshoot|
:---------:|:---------:|
|![](https://i.postimg.cc/nzC3QLD4/ezgif-com-gif-maker-2.gif)|![](https://i.postimg.cc/8zWdZFTr/2021-12-10-02-38.png)|
gif|screenshoot|
|![](https://i.postimg.cc/fyd5Bg5k/ezgif-com-gif-maker-1.gif)|![](https://i.postimg.cc/j2cPJ9Yx/123.png)|


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/alfiyansyahhh/Bot-Messenger
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

1. Edit env.example
   ```sh 
   MESSENGER_PAGE_ID= 
   MESSENGER_ACCESS_TOKEN=
   MESSENGER_APP_ID= 
   MESSENGER_APP_SECRET= 
   MESSENGER_VERIFY_TOKEN= 
   DATABASE_HOST=
   DATABASE_USER=
   DATABASE_PASSWORD=
   DATABASE_NAME=
   ```
   
   ToGet Messenger PAGE ID dll. you can Read [this](https://bottender.js.org/docs/channel-messenger-setup)
   
   To Get databases [here](https://github.com/alfiyansyahhh/Bot-Messenger/blob/master/file/bot.sql)
   
2. Delete .example
   ```sh 
   just use .env 
   ```
3. Run project ,In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.<br>
The bot will automatically reload if you make changes to the code.<br>
By default, server runs on [http://localhost:5000](http://localhost:5000) and ngrok runs on [http://localhost:4040](http://localhost:4040).

To run in [Console Mode](https://bottender.js.org/docs/en/the-basics-console-mode), provide the `--console` option:

```sh
npm run dev -- --console
yarn dev --console
```

### `npm start`

Runs the app in production mode.<br>
By default, server runs on [http://localhost:5000](http://localhost:5000).

To run in [Console Mode](https://bottender.js.org/docs/en/the-basics-console-mode), provide the `--console` option:

```sh
npm start -- --console
yarn start --console
```

### `npm run lint`

Runs the linter rules using [Eslint](https://eslint.org/).

### `npm test`

Runs the test cases using [Jest](https://jestjs.io/).

<p align="right">(<a href="#top">back to top</a>)</p>

## Router

| Method | Router | Description 
| --- | --- | --- |
| `Get` | /message | for get all message |
| `Get` | /message:id | for get messege detail |
| `Delete` | /message:id | for delete messege |

## Learn More

To learn Bottender, check out the [Bottender documentation](https://bottender.js.org/docs/en/getting-started).

For more examples, see [Bottender examples](https://github.com/Yoctol/bottender/tree/master/examples).



<!-- CONTACT -->
## Contact

alfiyansyah - alfiyansyahhh@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>
