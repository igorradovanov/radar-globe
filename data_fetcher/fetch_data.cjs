const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Load configuration
const config = require("./config.cjs");

// Constants
const API_URL =
  "https://api.cloudflare.com/client/v4/radar/attacks/layer7/top/attacks?dateRange=7d&limit=10";
const OUTPUT_FILE = path.join(__dirname, "globe_data.json");

// Country coordinates
const COUNTRY_LAT_LANG = {
  AD: [42.5, 1.5],
  AE: [24.0, 54.0],
  AF: [33.0, 65.0],
  AG: [17.05, -61.8],
  AI: [18.22, -63.05],
  AL: [41.0, 20.0],
  AM: [40.0, 45.0],
  AN: [12.17, -69.0],
  AO: [-12.5, 18.5],
  AQ: [-77.85, 166.67],
  AR: [-34.0, -64.0],
  AS: [-14.32, -170.5],
  AT: [47.33, 13.33],
  AU: [-25.0, 135.0],
  AW: [12.5, -69.97],
  AX: [60.12, 19.9],
  AZ: [40.5, 47.5],
  BA: [44.25, 17.83],
  BB: [13.17, -59.53],
  BD: [24.0, 90.0],
  BE: [50.83, 4.0],
  BF: [13.0, -2.0],
  BG: [43.0, 25.0],
  BH: [26.0, 50.5],
  BI: [-3.5, 30.0],
  BJ: [9.5, 2.25],
  BM: [32.33, -64.75],
  BN: [4.5, 114.67],
  BO: [-17.0, -65.0],
  BR: [-10.0, -55.0],
  BS: [24.0, -76.0],
  BT: [27.5, 90.5],
  BV: [-54.43, 3.4],
  BW: [-22.0, 24.0],
  BY: [53.0, 28.0],
  BZ: [17.25, -88.75],
  CA: [60.0, -96.0],
  CC: [-12.17, 96.83],
  CD: [-3.52, 23.42],
  CF: [7.0, 21.0],
  CG: [-1.0, 15.0],
  CH: [47.0, 8.0],
  CI: [8.0, -5.0],
  CK: [-20.0, -158.0],
  CL: [-30.0, -71.0],
  CM: [6.0, 12.0],
  CN: [35.0, 105.0],
  CO: [4.0, -72.0],
  CR: [10.0, -84.0],
  CS: [44.8, 20.5],
  CU: [21.5, -80.0],
  CV: [16.0, -24.0],
  CX: [-10.5, 105.67],
  CY: [35.0, 33.0],
  CZ: [49.75, 15.0],
  DE: [51.5, 10.5],
  DJ: [11.5, 42.5],
  DK: [56.0, 10.0],
  DM: [15.5, -61.33],
  DO: [19.0, -70.67],
  DZ: [28.0, 3.0],
  EC: [-2.0, -77.5],
  EE: [59.0, 26.0],
  EG: [27.0, 30.0],
  EH: [23.0, -14.0],
  ER: [15.0, 39.0],
  ES: [40.0, -4.0],
  ET: [8.0, 39.0],
  FI: [64.0, 26.0],
  FJ: [-18.0, 178.0],
  FK: [-51.75, -59.0],
  FM: [5.0, 152.0],
  FO: [62.0, -7.0],
  FR: [46.0, 2.0],
  FX: [48.87, 2.33],
  GA: [-1.0, 11.75],
  GB: [54.0, -4.5],
  GD: [12.12, -61.67],
  GE: [42.0, 43.5],
  GF: [4.0, -53.0],
  GG: [49.45, -2.55],
  GH: [8.0, -2.0],
  GI: [36.13, -5.35],
  GL: [72.0, -40.0],
  GM: [13.5, -15.5],
  GN: [11.0, -10.0],
  GP: [16.25, -61.58],
  GQ: [2.0, 10.0],
  GR: [39.0, 22.0],
  GS: [-54.5, -37.0],
  GT: [15.5, -90.25],
  GU: [13.47, 144.83],
  GW: [12.0, -15.0],
  GY: [5.0, -59.0],
  HK: [22.25, 114.17],
  HM: [-53.1, 73.52],
  HN: [15.0, -86.5],
  HR: [45.17, 15.5],
  HT: [19.0, -72.42],
  HU: [47.0, 20.0],
  ID: [-5.0, 120.0],
  IE: [53.0, -8.0],
  IL: [31.5, 34.75],
  IM: [54.23, -4.55],
  IN: [20.0, 77.0],
  IO: [-6.0, 71.5],
  IQ: [33.0, 44.0],
  IR: [32.0, 53.0],
  IS: [65.0, -18.0],
  IT: [42.83, 12.83],
  JE: [49.19, -2.11],
  JM: [18.25, -77.5],
  JO: [31.0, 36.0],
  JP: [36.0, 138.0],
  KE: [1.0, 38.0],
  KG: [41.0, 75.0],
  KH: [13.0, 105.0],
  KI: [-5.0, -170.0],
  KM: [-12.17, 44.25],
  KN: [17.33, -62.75],
  KP: [40.0, 127.0],
  KR: [37.0, 127.5],
  KW: [29.5, 47.75],
  KY: [19.5, -80.67],
  KZ: [48.0, 68.0],
  LA: [18.0, 105.0],
  LB: [33.83, 35.83],
  LC: [13.88, -60.97],
  LI: [47.17, 9.53],
  LK: [7.0, 81.0],
  LR: [6.5, -9.5],
  LS: [-29.5, 28.25],
  LT: [56.0, 24.0],
  LU: [49.75, 6.17],
  LV: [57.0, 25.0],
  LY: [25.0, 17.0],
  MA: [32.0, -5.0],
  MC: [43.73, 7.42],
  MD: [47.0, 29.0],
  ME: [42.8, 19.2],
  MG: [-20.0, 47.0],
  MH: [11.0, 168.0],
  MK: [41.83, 22.0],
  ML: [17.0, -4.0],
  MM: [22.0, 98.0],
  MN: [46.0, 105.0],
  MO: [22.0, 113.0],
  MP: [15.12, 145.67],
  MQ: [14.67, -61.0],
  MR: [20.0, -12.0],
  MS: [16.75, -62.2],
  MT: [35.92, 14.42],
  MU: [-20.3, 57.58],
  MV: [3.2, 73.0],
  MW: [-13.5, 34.0],
  MX: [23.0, -102.0],
  MY: [4.22, 101.97],
  MZ: [-18.25, 35.0],
  NA: [-22.0, 17.0],
  NC: [-21.5, 165.5],
  NE: [16.0, 8.0],
  NF: [-29.08, 167.92],
  NG: [10.0, 8.0],
  NI: [13.0, -85.0],
  NL: [52.5, 5.75],
  NO: [62.0, 10.0],
  NP: [28.0, 84.0],
  NR: [-0.53, 166.92],
  NU: [-19.03, -169.87],
  NZ: [-42.0, 174.0],
  OM: [21.0, 57.0],
  PA: [9.0, -80.0],
  PE: [-10.0, -76.0],
  PF: [-15.0, -140.0],
  PG: [-6.0, 147.0],
  PH: [13.0, 122.0],
  PK: [30.0, 70.0],
  PL: [52.0, 20.0],
  PM: [46.83, -56.33],
  PN: [-25.07, -130.08],
  PR: [18.23, -66.55],
  PS: [32.0, 35.25],
  PT: [39.5, -8.0],
  PW: [6.0, 134.0],
  PY: [-23.0, -58.0],
  QA: [25.5, 51.25],
  RE: [-21.1, 55.6],
  RO: [46.0, 25.0],
  RS: [43.8, 21.0],
  RU: [60.0, 47.0],
  RW: [-2.0, 30.0],
  SA: [25.0, 45.0],
  SB: [-8.0, 159.0],
  SC: [-4.58, 55.67],
  SD: [15.0, 30.0],
  SE: [62.0, 15.0],
  SG: [1.37, 103.8],
  SH: [-15.95, -5.7],
  SI: [46.25, 15.17],
  SJ: [78.0, 20.0],
  SK: [48.67, 19.5],
  SL: [8.5, -11.5],
  SM: [43.93, 12.42],
  SN: [14.0, -14.0],
  SO: [6.0, 48.0],
  SR: [4.0, -56.0],
  ST: [1.0, 7.0],
  SU: [60.0, 47.0],
  SV: [13.83, -88.92],
  SY: [35.0, 38.0],
  SZ: [-26.5, 31.5],
  TC: [21.73, -71.58],
  TD: [15.0, 19.0],
  TF: [-43.0, 67.0],
  TG: [8.0, 1.17],
  TH: [15.0, 100.0],
  TJ: [39.0, 71.0],
  TK: [-9.0, -171.75],
  TL: [-8.87, 125.72],
  TM: [40.0, 60.0],
  TN: [34.0, 9.0],
  TO: [-20.0, -175.0],
  TP: [-9.0, 125.0],
  TR: [39.0, 35.0],
  TT: [11.0, -61.0],
  TV: [-8.0, 178.0],
  TW: [23.5, 121.0],
  TZ: [-6.0, 35.0],
  UA: [49.0, 32.0],
  UG: [2.0, 33.0],
  UM: [10.0, -175.0],
  US: [38.0, -98.0],
  UY: [-33.0, -56.0],
  UZ: [41.0, 64.0],
  VA: [41.9, 12.45],
  VC: [13.08, -61.2],
  VE: [8.0, -66.0],
  VG: [18.5, -64.5],
  VI: [18.5, -64.43],
  VN: [16.0, 106.0],
  VU: [-16.0, 167.0],
  WF: [-14.0, -177.0],
  WS: [-13.58, -172.33],
  YE: [15.5, 47.5],
  YT: [-12.83, 45.17],
  YU: [44.0, 21.0],
  ZA: [-30.0, 26.0],
  ZM: [-15.0, 30.0],
  ZR: [-1.0, 22.0],
  ZW: [-19.0, 29.0],
};

async function fetchData(url, key) {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function processData(apiData, countryCoords) {
  if (!apiData.success) {
    console.error("API data not successful:", apiData);
    return null;
  }

  const attacks = apiData.result.top_0;
  const formattedData = [];

  attacks.forEach((attack) => {
    const originCode = attack.originCountryAlpha2;
    const targetCode = attack.targetCountryAlpha2;

    const originCoords = countryCoords[originCode] || null;
    const targetCoords = countryCoords[targetCode] || null;

    if (originCoords && targetCoords) {
      formattedData.push({
        startLat: originCoords[0],
        startLng: originCoords[1],
        endLat: targetCoords[0],
        endLng: targetCoords[1],
        color: getRandomColor(),
      });

      console.log(
        "Formatted Data Entry:",
        formattedData[formattedData.length - 1]
      );
    } else {
      console.error(
        "Missing coordinates for Origin Code:",
        originCode,
        "or Target Code:",
        targetCode
      );
    }
  });

  console.log("Final Formatted Data:", formattedData);
  return formattedData;
}

function getRandomColor() {
  const colors = [
    "purple",
    "aqua",
    "orange",
    "green",
    "red",
    "blue",
    "yellow",
    "pink",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

(async () => {
  const data = await fetchData(API_URL, config.api_key);
  if (data) {
    const globeData = processData(data, COUNTRY_LAT_LANG);
    if (globeData) {
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(globeData, null, 2));
      console.log("Data saved to", OUTPUT_FILE);
    }
  }
})();
