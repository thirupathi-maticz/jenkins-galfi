import config from './config'

var net={}
if(config.EnvName === "demo" || config.EnvName === "local"){
    net ={
        43113 : {   // binance testnet
    
            chain:"Binance",
            rpcUrl:"https://endpoints.omniatech.io/v1/bsc/testnet/public",
            networkVersion:'97',
            chainId :'97',
            currencySymbol:"BNB",
            tokenSymbol:"CAKE",
            tokenAddress:'0x7CAB80ce0E55F46378E493B584eE61aD68878f11'.toLowerCase(),
            singleContract :'0x1d205138f36b4938dD7930Ea57add7bfD376B4D1'.toLowerCase(),
            multipleContract:'0x641e7A8F7e414eE6F05C8B0528877e680e4693E6'.toLowerCase(),
            tradeContract :"0x419Ee320F99287A93B4362C4A45679E30736d05a".toLowerCase(),
            adminAddress:"0x025c1667471685c323808647299e5dbf9d6adcc9".toLowerCase(),
            chainName : "BSC_TESTNET"
    
        },
        11155111 : {  // Avalanche_Testnet 
    
            chain:"ETH",
            rpcUrl: "https://sepolia.drpc.org/",
            networkVersion:'11155111',
            chainId :'11155111',
            currencySymbol:"ETH",
            tokenSymbol:"CAKE",
            siteUrl:"https://testnet.snowtrace.io",
            tokenAddress:"0xc6aBa068A91d327B259327523f71f51221943186".toLowerCase(),
            deadaddress : '0x000000000000000000000000000000000000dEaD'.toLowerCase(),
            tradeContract   :   '0x3451a375938421a1892482a558316ba336c20acb'.toLowerCase(),
            singleContract      :  '0x362836C8be9f0487309cf962cc36Ed6e90177937'.toLowerCase(),
            multipleContract  :   '0x708390Ff3f96F4F46761319E07c50f0DADC22E66'.toLowerCase(),
            adminAddrsss:"0x025c1667471685c323808647299e5dbf9d6adcc9".toLowerCase(),
            chainName : "ETHER_TESTNET"
    
        }
    }
}


export const network = net