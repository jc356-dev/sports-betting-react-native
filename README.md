# BetSlip

# Next.js Backend and React Native (Expo) Setup

This guide will walk you through setting up and running the Next.js backend and React Native (Expo) app.

## Prerequisites

Ensure you have the following installed:

- Node.js (Latest LTS recommended v20.x)
- npm
- Expo CLI (`npm install -g expo-cli`)

## Setting Up and Running the Next.js Backend

1. **Clone the Repository:**
   ```sh
   git clone <betslip-repo-url>
   cd <betslip>/betslip-react-native
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   or
   npm install --force
   ```

3. **Set Up Environment Variables:**
   ```sh
   GRAPHQL_ENDPOINT=http://localhost:3000/api/graphql
   ```

### Example Request
To test the backend API, you can use the following cURL command:

```sh
curl --location 'http://127.0.0.1:3000/api/graphql' \
--header 'Content-Type: application/json' \
--data '{
  "query": "mutation placeBet($input: PlaceBetInput!) { placeBet(input: $input) { id match betDetail odds amount type } }",
  "variables": {
    "input": {
      "match": "Lakers vs Heat",
      "betDetail": "Lakers -2.5",
      "odds": "+150",
      "amount": 10000,
      "type": "Singles"
    }
  }
}'
```

4. **Run the Development Server:**
   ```sh
   npm run dev
   ```
   The Next.js backend should now be running at `http://localhost:3000`.

## Setting Up and Running the React Native (Expo) App

**Important:** Ensure the Next.js backend is running before starting the React Native app.

1. **Navigate to the React Native App Folder:**
   ```sh
   cd betslip-react-native
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables:**
   ```sh
   GRAPHQL_API_URL=http://localhost:3000/api/graphql
   ```

4. **Start the Expo Development Server:**
   ```sh
   npm start
   ```

5. **Run the App on a Device or Emulator:**
   - To run on an iOS simulator: Press `i` in the terminal.
   - To run on an Android emulator: Press `a` in the terminal.
   - To scan and open on a physical device: Use the Expo Go app.

## Additional Commands

- **Build the Next.js Backend:**
  ```sh
  npm build
  ```
  Then start the production server:
  ```sh
  npm start
  ```

- **Eject Expo (If needed for native dependencies):**
  ```sh
  expo eject
  ```

## Notes

- Ensure both backend and frontend use the correct GraphQL API URL.
- If running on a physical device, replace `localhost` with your machine's IP address in `.env`.
- Relay environment should be configured properly in the React Native app to consume the GraphQL API.

## Troubleshooting

- **Expo network issues:** Ensure your backend allows connections from your device.
- **GraphQL queries not working:** Check the API URL and CORS settings.

## Development Approach

### 1. Component Breakdown and Context Setup
The development process started by analyzing the Figma design and breaking down the UI into reusable components. A React Context was created to manage state and handle functionalities across different components efficiently.

### 2. Backend Development with Next.js and GraphQL
A Next.js backend was developed with GraphQL to handle fetching the bet list and placing bets. This approach allows for efficient data fetching and mutation handling.

### 3. API Integration in React Native
The backend APIs were then integrated into the React Native (Expo) frontend. The React Native app communicates with the Next.js GraphQL server to fetch bet items and submit bets seamlessly, ensuring smooth user interaction and real-time updates.