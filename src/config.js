// import ERC721 from '../../src/Abi/erc721.json'
// import ERC1155 from '../../src/Abi/erc1155.json'
// import TRADE from '../../src/Abi/market.json'
// require('dotenv')

import noimage from './Assets/no data.png'
const EnvName = 'demo';
var key = {};
key.KEY = 'CardBo@rD1290%6Fine3'
key.EnvName = EnvName;
key.ONEDAYINSECONDS = 0
key.BLOCKS_PER_YEAR = 0
key.NOIMAGE = noimage
key.ENCODEKEY = "gallfi@mArt!game"
key.ClI_ID = "42b342577b8de3ce7128280cb30a529a"
key.RPAD_ADDRESS = ''
key.ROUTER = ''
key.EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
key.MOBILE = /^\d{10}$/
key.NumOnly = /^\d+$/
key.PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
key.OnlyAlbhabets = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/
key.notSpecil = /^[a-zA-Z-9]+$/
key.OnlyAlphSpecial = /^[A-Za-z_@.#&+-]*$/
key.IPFS = 'https://ipfs.io/ipfs/'
key.limit = 50
key.NumDigitOnly = /[^0-9\.]/g
key.NumberOnly = /[^0-9]/g
if (EnvName === "demo") {
    console.log("demo config running................")
    key.adminaddress = "0xEA4fE72960C36CA7a9F4E6A107fDfE07a952704E".toLowerCase()
    // key.adminaddress = '0xEA4fE72960C36CA7a9F4E6A107fDfE07a952704E'.toLowerCase()
    key.FRONT_URL = 'https://galfifront.maticz.in/'
    key.BACK_URL = 'https://backend-galfi.maticz.in/v1'
    key.ADMIN_URL = 'https://backend-galfi.maticz.in/v1/admin'
    key.IMG_URL = 'https://backend-galfi.maticz.in'
    key.chain_Id_List = [97, 43113]
    key.DEADADDRESS = '0x000000000000000000000000000000000000dEaD'.toLowerCase()
    key.TradeContract = '0xEF747c5efE5e0eb67DCC06896341dfb9DF5f4F29'.toLowerCase()
    key.ERC721 = '0x01769d2C31143933cda2680605f4D379c417e793'.toLowerCase()
    key.ERC1155 = '0x708390Ff3f96F4F46761319E07c50f0DADC22E66'.toLowerCase()
    key.erc20Address = '0x7CAB80ce0E55F46378E493B584eE61aD68878f11'.toLowerCase()
    key.RPC_URL = "https://bsc-testnet-rpc.publicnode.com"
    key.CHAIN_ID = 11155111
    key.chain_Id_List = [97, 43113]
    key.Block_URL = "https://testnet.bscscan.com"
    key.COIN_NAME = "BNB"
}

 if (EnvName === "local") {
    key.FRONT_URL = 'http://localhost:3000/phoneixai'
    key.BACK_URL = 'http://localhost:4000/v1'
    key.ADMIN_URL = 'http://localhost:4000/v1/admin'
    key.IMG_URL = 'http://localhost:4000'
    key.DefaultImg = "/assets/images/avatar/avatar-01.png"
    key.CoverImg = 'http://localhost:3330/demobanner.jpg'
    key.DEADADDRESS = '0x000000000000000000000000000000000000dEaD'.toLowerCase()
    // key.TradeContract = '0xEF747c5efE5e0eb67DCC06896341dfb9DF5f4F29'.toLowerCase()
    // key.ERC721 = '0x01769d2C31143933cda2680605f4D379c417e793'.toLowerCase()
    // key.ERC1155 = '0x708390Ff3f96F4F46761319E07c50f0DADC22E66'.toLowerCase()
    key.TradeContract = '0x3451a375938421a1892482a558316ba336c20acb'.toLowerCase()
    key.ERC721 = '0x362836C8be9f0487309cf962cc36Ed6e90177937'.toLowerCase()
    key.ERC1155 = '0x708390Ff3f96F4F46761319E07c50f0DADC22E66'.toLowerCase()
    key.erc20Address = '0xc6aBa068A91d327B259327523f71f51221943186'.toLowerCase()
    // key.erc20Address = '0x7CAB80ce0E55F46378E493B584eE61aD68878f11'.toLowerCase()
    // key.RPC_URL = "https://bsc-testnet-rpc.publicnode.com"
     key.RPC_URL =  "https://sepolia.drpc.org/"
    key.CHAIN_ID = 11155111
    key.chain_Id_List = [11155111, 97]
    key.Block_URL = "https://testnet.bscscan.com"
    key.COIN_NAME = "sepolia"
    key.BNBCHAIN = 43113
    key.ETHCHAIN = 11155111
    
    
    
}

export default key;
