# Crypto API Learning Project

This project is a simple Express server that interacts with the CoinGecko API to fetch and display cryptocurrency data. The server provides endpoints to list coins, get coin IDs based on ticker symbols, and fetch detailed coin data.

## Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).
You will also need to generate an API key for CoinGecko. Check [CoinGecko's Authentication documentation](https://docs.coingecko.com/v3.0.1/reference/authentication).

## Installation

1. Clone the repository to your local machine:

    ```sh
    git clone https://github.com/your-username/crypto-api-learning-project.git
    ```

2. Navigate to the project directory:

    ```sh
    cd crypto-api-learning-project
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

4. Create a `.env` file in the root of your project and add your API key:

    ```env
    API_KEY=your_api_key_here
    ```

## Running the Server

To start the server, you can use `nodemon` for automatic restarts when your code changes, or `node` to run it once.

### Using Nodemon

1. Make sure `nodemon` is installed globally on your machine. If not, install it using:

    ```sh
    npm install -g nodemon
    ```

2. Start the server with `nodemon`:

    ```sh
    nodemon index.mjs
    ```

### Using Node

If you prefer to run the server without `nodemon`, use:

```sh
node index.mjs
```

## Endpoints

The server provides the following endpoints:

- **GET /list**: Fetches the list of coins and saves it to a JSON file if not already saved.
- **POST /coin-ids**: Accepts a ticker symbol and returns the corresponding coin IDs.
- **POST /coin-data**: Accepts a coin ID and returns detailed data about the coin.

## Configuration

The server interacts with the CoinGecko API using an API key. Ensure you have a valid API key and set it in the `API_KEY` variable within your code.

## Static Files

Static files (HTML, CSS, JavaScript) are served from the `/public` directory.

## Notes

- Ensure that the `data/coins_map.json` file is writable by the server process as it saves data fetched from the CoinGecko API.
- Modify the `coinsMapPath` and other configurations as needed to suit your environment.

## Example Usage

1. Fetch the list of coins and save it to a JSON file:

    ```sh
    curl http://localhost:3000/list
    ```

2. Get coin IDs by ticker symbol:

    ```sh
    curl -X POST -d "ticker=btc" http://localhost:3000/coin-ids
    ```

3. Get detailed coin data by ID:

    ```sh
    curl -X POST -d "coinId=bitcoin" http://localhost:3000/coin-data
    ```

## License

This project is licensed under the MIT License.

### Summary

1. **Clone the repository** to your local machine using the provided Git command.
2. **Navigate to the project directory** using the `cd` command.
3. **Install the dependencies** using `npm install`.
4. **Start the server** using either `nodemon` or `node` as per your preference.
5. **Access the endpoints** to interact with the server and fetch cryptocurrency data.

This README provides all the necessary instructions to set up and run the server, as well as details about the available endpoints and how to use them.