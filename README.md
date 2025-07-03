# 📈 StockVerse

StockVerse is a cross-platform **React Native** app that lets users explore live stock market data, track favorite stocks, and manage personalized watchlists with a clean and intuitive UI.

---

## ✨ Features

- 🔍 Explore top **Gainers**, **Losers**, and **Most Active** stocks.  
- 📊 View detailed **company overviews** and **daily price series**.  
- 🛡️ Local caching with **AsyncStorage** for faster data load.  
- 🧾 Create & manage **Watchlists**.  
- ✅ Built with **React Native**, **TypeScript**, **React Query**, and the **Alpha Vantage API**.  

---

## 📱 Screenshots

| Explore Screen                         | Stock Details Screen                    | Watchlist                              |
|----------------------------------------|-----------------------------------------|----------------------------------------|
| ![Explore](screenshots/explore.png)    | ![Details](screenshots/details.png)     | ![Watchlist](screenshots/watchlist.png) |

> _Add screenshots inside a `screenshots/` folder and update the image paths above._

---

## 🚀 Getting Started

> **Note:** Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/environment-setup) before proceeding.

### Step 1: Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/stockverse.git
cd stockverse
Step 2: Install Dependencies
bash
Copy
Edit
# Using npm
npm install

# OR using Yarn
yarn install
Step 3: Add Alpha Vantage API Key
Create a .env file in the root folder:

env
Copy
Edit
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
Step 4: Start Metro
Metro is the JavaScript bundler for React Native. Start it with:

bash
Copy
Edit
# Using npm
npm start

# OR using Yarn
yarn start
Step 5: Build & Run the App
Android
bash
Copy
Edit
npm run android
# OR
yarn android
iOS
For iOS, install CocoaPods dependencies first:

bash
Copy
Edit
cd ios
pod install
cd ..
Then run:

bash
Copy
Edit
npm run ios
# OR
yarn ios
🔄 Hot Reloading
You can make changes in the code and see them instantly with Fast Refresh.

Android Emulator: Press <kbd>R</kbd> twice or open the dev menu with <kbd>Cmd</kbd>+<kbd>M</kbd> / <kbd>Ctrl</kbd>+<kbd>M</kbd>.

iOS Simulator: Press <kbd>Cmd</kbd> + <kbd>R</kbd>.

⚙️ Project Structure
graphql
Copy
Edit
src
├── components       # Reusable UI components
├── constants        # API base URLs & endpoints
├── navigation       # React Navigation setup
├── screens          # Explore, Details, Watchlist screens
├── services         # API services & cache logic
├── storage          # Local AsyncStorage helpers
├── viewModels       # React Query hooks
└── styles           # Shared styles
🛡️ API Rate Limits
Powered by Alpha Vantage:

Free Tier: 5 requests/minute, 500 requests/day

Upgrade your key to remove rate limits.

🔧 Troubleshooting
If you face any issues, refer to the official docs:

React Native Troubleshooting

📚 Learn More
React Native Docs

Alpha Vantage API Docs

React Query Docs

📜 License
MIT License © 2025 Your Name

🙌 Contributors
Your Name
