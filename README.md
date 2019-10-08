# Chess Online

Welcome to Chess Online, an interactive player vs player chess competition platform.

**Deployed at:**
```
https://ch3ss-online.herokuapp.com
```

**This application was built using:**
- NERD stack (Node, Express, React and Redux, PostgreSQL)
- Chessboardjsx and Chess.js
- Socket.io

**Some features include:**
- rooms that host real-time and persistent games and chat messages
- queue that manages player order in each room, with priority given to the winner to stay in game
- game modals with tailored messages based on user

## Instructions

**Setup**
```
npm install
createdb chess-online (for Postgres database)
npm run seed (for existing users, rooms, and games)
```

**Commands**
```
npm run start-dev (builds webpack and starts server)
```
