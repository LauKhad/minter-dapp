require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "DiscoMacaws";
const description = "Virtual store of Colombian origin whose main objective is to generate virtual art that will be used to renew the ticketing of nightclubs and events. Each NFT in our store features a macaw that has characteristic accessories from our regions. A percentage of the profits will be donated to foundations that watch over the conservation of the Amazon ecosystem that is home to macaws and many other natural species that need to be preserved.";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

const layerConfigurations = [
  {
    growEditionSizeTo: 10200,
    layersOrder: [
      { name: "Fondos" },
      { name: "Guacamayos" },
      { name: "Aureola" },
      { name: "Colgantes" },
      { name: "Monoculo" },
      { name: "Gorras" },
    ],
  },{
    growEditionSizeTo: 10220,
    layersOrder: [
      { name: "Fondos" },
      { name: "Huevos" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 4096,
  height: 4096,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://discomacaws.netlify.app//", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'rinkeby'; // only rinkeby, polygon, or ethereum

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'DiscoMacaws';
const CONTRACT_SYMBOL = 'DMW';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0xa8b930C2547c12D94A600259DB5930aCd795c459';
const TREASURY_ADDRESS = '0xa8b930C2547c12D94A600259DB5930aCd795c459';
const MAX_SUPPLY = 5000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.002; // Minting price per NFT. Rinkeby = ETH, Ethereum = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-07-14T11:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-07-11T11:30:48+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0xa8b930C2547c12D94A600259DB5930aCd795c459"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = []; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "¡Eclosiona tu nueva aventura!"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeicsq2e5pz4eyqbdypr3js6r24tdddq5hoeoepi72t6mudh34b2psm, https://ipfs.io/ipfs/bafybeibo3hg4dx7tnkwmkxj5eups7futxdajzcmynjqeh7oajosetvhmqa, https://ipfs.io/ipfs/bafybeiehs2ionhjsu6lkdvvxsgebjmsimyozleqbjsg6jzbrp57livhscu, https://ipfs.io/ipfs/bafybeieuvxnxw4dmfdpbuvbvqmho3mxr272tgs3kmirzenjxjdy3d34hcm, https://ipfs.io/ipfs/bafybeihmc4app2wje3doo74cafbrznd5e5r6iqismo7s7stzva5sroduaq, https://ipfs.io/ipfs/bafybeidbundeuwjqr2jb4pcpl3su7wwclok37wckijriuuq3pfl5faasv4, https://ipfs.io/ipfs/bafybeigi6fsop447da6lfrrpyml576rusinbuaja3wpb3xffpmqufdoow4, https://ipfs.io/ipfs/bafybeibi5scxghcvg76noehzxoqgt57x75wso2jylsbrshbydyimar4zpa, https://ipfs.io/ipfs/bafybeicjvgfbk5h6myxunctio5nfmdiqpeupza3zpm6ofkf6rhpcdjxeve, https://ipfs.io/ipfs/bafybeic7jmsfzqfqoicx6sil3iemzs7yvrfrqbxgbcvp2ydwii6zv6o2te, https://ipfs.io/ipfs/bafybeicmg2tetlvtqsbepcbh5taoaarlrkzkudn5jqkndohxiuhhzt2dee, https://ipfs.io/ipfs/bafybeifn2pb2hnkkffq4uuyead3uwovsbwgpfs7os7cb3v5myxiljqno4i, https://ipfs.io/ipfs/bafybeifmmoufeh7ionc5wqnfolg5abn5vfvc7xqjstoprjitfdqpkcwdky, https://ipfs.io/ipfs/bafybeiek2nycjd6fwtaf6jxunlcp2sb65g6wafro2dgxuupov2fmqrjj7m, https://ipfs.io/ipfs/bafybeifb4eurddxqno56g22hny22u56y4k464zoxg7otaft7swlyvsvkta, https://ipfs.io/ipfs/bafybeihkqahyp7nfkhzgouh4uuepg4mm343eyfmp5tlqtqbrxu3bjm66qq, https://ipfs.io/ipfs/bafybeid33vjiy7cywog7eusczfwbonflsd7ghogpr5grmowmblojjh4sne, https://ipfs.io/ipfs/bafkreietytepj64gditkakyixv4wz3qnnhokdn6byny4zwzh6v66t3skgm"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK") {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
