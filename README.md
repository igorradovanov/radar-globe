# Radar Globe  

This project fetches data from the Cloudflare Radar API, processes it, and visualizes it on a globe using the `globe.gl` library.  

![Globe](https://github.com/igorradovanov/radar-globe/blob/main/globe-animate.gif)

## Prerequisites  

- Node.js installed on your machine  
- An API key for the Cloudflare Radar API  

## Installation  

1. Clone the repository:  

```sh  
git clone https://github.com/yourusername/radar-globe.git  
cd radar-globe  
```  

2. Install the dependencies:  

```sh  
npm install  
```  

## Configuration  

1. Create a `config.cjs` file in the root directory with your Cloudflare API key:  

```javascript  
module.exports = {  
  apiKey: "YOUR_CLOUDFLARE_API_KEY",  
};  
```  

## Fetching Data  

Run the `fetch_data.cjs` script to fetch data from the Cloudflare Radar API and save it to `globe_data.json`:  

```sh  
node fetch_data.cjs  
```  

This script will:  
- Fetch the top Layer 7 attacks from the Cloudflare Radar API.  
- Process the data to extract the necessary information.  
- Save the processed data to `globe_data.json`.  

## Running the Application  

1. Start the development server:  

```sh  
npm start  
```  

This will start the development server and open the application in your default web browser.  

## Viewing the Globe  

Navigate to `http://localhost:3000` in your web browser to view the globe visualization.  
The application will display arcs representing the top Layer 7 attacks on the globe.  

## File Structure  

- **`fetch_data.cjs`**: Script to fetch and process data from the Cloudflare Radar API.  
- **`globe_data.json`**: JSON file where the processed data is saved.  
- **`App.jsx`**: React component that initializes and displays the globe visualization.  
- **`config.cjs`**: Configuration file for storing the Cloudflare API key.  

## License  

This project is licensed under the MIT License.  
