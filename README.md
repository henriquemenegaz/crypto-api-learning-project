# Crypto API Learning Project

This project is a simple Express server that interacts with the CoinGecko API to fetch and display cryptocurrency data. The server provides endpoints to list coins, get coin IDs based on ticker symbols, and fetch detailed coin data.

## Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

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
nodemon index.mjs
