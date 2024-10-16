
import Web3 from "web3";
import Config from "../../config";
import marketAbi from '../../Abi/market.json'
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import toast from "react-hot-toast";


export const connectWallet = async (type, changechainid, switched) => {

  let accountDetails = {}
  let web3Obj = {}

  if (type === "MetaMask" || type === 'BinanceWallet' || type === 'TrustWallet') {
    web3Obj = await MetamaskWallet(type, changechainid)
    console.log("webobjadaws", web3Obj)

  }
  if (type === 'WalletConnect') {
    web3Obj = await WalletConnect(type, changechainid, switched)
  }
  if ( web3Obj && Object.keys(web3Obj)?.length != 0) {
    console.log("get Web3", web3Obj)
    try {
      var web3p = new Web3(Config.RPC_URL)
      const accounts = await web3Obj.eth.getAccounts();

      accountDetails.accountAddress = accounts[0]?.toString()?.toLowerCase();
     
      accountDetails.coinBalance = await web3Obj.eth.getBalance(accountDetails.accountAddress);
      accountDetails.web3p = web3p;

      accountDetails.web3 = web3Obj;
      accountDetails.tokenBalance = 0
  
      console.log("acocococococo", accountDetails);
      return accountDetails;
    }
    catch (e) {
      console.log("find ee", e)
     
    }
  }
  else{
    return {}
  }
}

export const MetamaskWallet = async (type, changechainid) => {


  var web3
  try {
    if (window.ethereum && type == 'MetaMask') {
      web3 = new Web3(window.ethereum);
      if (window.ethereum.isMetaMask) {
        const chainId = await web3?.eth.getChainId();
        var correctchainid = (!Config.chain_Id_List.includes(chainId)) ? Config.CHAIN_ID : (!changechainid) ? chainId : changechainid
        console.log("accountDetails type id@che", chainId, web3, correctchainid)
        if (parseInt(chainId) != parseInt(correctchainid)) {
          var getAccountDetails = await chainIdCheck(correctchainid, web3)
        }
        web3 = new Web3(window.ethereum);
        console.log("SWITCH", await web3.eth.getChainId())
    
        await window.ethereum.enable().then(async () => {
   
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0].toString().toLowerCase();
          localStorage.setItem("accountInfo", account)
          localStorage.setItem('walletConnectType', type)
        });
     
      }
      else {
        alert("Please Uninstall TrustWallet or Connect to TrustWallet")
        return false;
      }
      console.log("return web3;", web3);
      return web3;

    }
    else if (window.BinanceChain && type == 'BinanceWallet') {
      web3 = new Web3(window.BinanceChain);
      const chainId = await web3.eth.getChainId();
      ////console("accountDetails type id",chainId,web3)
      if (parseInt(chainId) != parseInt(Config.CHAIN_ID)) {
        chainIdCheck()
        return true
      }
      await window.BinanceChain.enable().then(async () => {
        // User has allowed account access to DApp...
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0].toString().toLowerCase();
        localStorage.setItem("accountInfo", account)
        localStorage.setItem('walletConnectType', type)
      });
    }
    else if( type == 'TrustWallet'){
      const isTrustWallet = (ethereum) => {
        // Identify if Trust Wallet injected provider is present.
        const trustWallet = !!ethereum.isTrust;
    
        return trustWallet;
      };
      web3 = new Web3(window.ethereum);
      console.log("etiriumenable",web3,window.ethereum.isTrust,window.ethereum.isTrustWallet);

        const chainId = await web3.eth.getChainId();
        //console("accountDetails type id",chainId,web3)
        if (parseInt(chainId) != parseInt(Config.CHAIN_ID)) {
          chainIdCheck(Config.CHAIN_ID,web3)
          return true
        }
          await window.ethereum.enable().then(async () => {
            // User has allowed account access to DApp...
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0].toString().toLowerCase();
            localStorage.setItem("accountInfo", account)
            localStorage.setItem('walletConnectType', type)
          });
    }
    // Legacy DApp Browsers
    //check
    else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
      const chainId = await web3.eth.getChainId();
      if (parseInt(chainId) != parseInt(Config.CHAIN_ID)) {
        chainIdCheck()
        return true
      }
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0].toString().toLowerCase();
      localStorage.setItem("accountInfo", account)
      localStorage.setItem('walletConnectType', type)
    }
    // Non-DApp Browsers
    else {
      //alert('No Dapp Supported Wallet Found');
   
    }

  } catch (e) {
    console.log("accountDetails type id1 last", e)
  }

  return web3;

}




export const WalletConnect = async (type, changechainid, status) => {
  console.log("2222")
  const CHAIN_ID = Config.CHAIN_ID;
  console.log("awrwdewe",type, changechainid, status);
  if (status === 'switched') {
    try {
      const hexString = changechainid.toString(16);

      console.log("vkfjkvfb", hexString, changechainid);

      const provider = await EthereumProvider.init({
        projectId: 'b8a1daa2dd22335a2fe1d2e139980ae0', // required
        chains: [changechainid], // required
        optionalChains: [1, 56],
        showQrModal: true // requires @walletconnect/modal
      })
      await provider.enable()
      console.log("flkkfbk", provider);
      // await provider.connect()


      var web3 = new Web3(provider);
      const accounts = await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: "0x" + hexString }],
      });
      console.log("kjdfksk", accounts);
     
      return web3;
    }
    catch (err) {
      console.log("ffddfbdfb", err);
    }
  }

  if (localStorage.getItem("accountInfo")) {
    try {


      const provider = await EthereumProvider.init({
        projectId: 'b8a1daa2dd22335a2fe1d2e139980ae0', // required
        chains: [CHAIN_ID], // required
        optionalChains: [1, 56],
        showQrModal: true // requires @walletconnect/modal
      })
      await provider.enable()

      let web3 = new Web3(provider);
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      });
      var account = accounts[0].toString();
      localStorage.setItem("accountInfo", account)
      localStorage.setItem('walletConnectType', type)
      return web3;
    }
    catch (error) {
      console.error(error)
   
    }
  }
  else {
    try {
      const provider = await EthereumProvider.init({
        projectId: 'b8a1daa2dd22335a2fe1d2e139980ae0', // required
        chains: [Config.CHAIN_ID], // required
        // optionalChains: [1, 56],
        showQrModal: true // requires @walletconnect/modal
      })
      console.log("prprprprprpr",provider);
      await provider.connect()
      console.log("prprprprprpr",provider);
      let  web3 = new Web3(provider);
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      });
      let account = accounts[0].toString();
      localStorage.setItem("accountInfo", account)
      localStorage.setItem('walletConnectType', type)

      return web3;
    }
    catch (error) {
      console.log("_____________________________")
      console.error(error)
      return ({})
    }
  }

}





export const chainIdCheck = async (e, web3) => {

  if (window.ethereum) {
    try {

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(e).toString(16) }], // chainId must be in hexadecimal numbers
      });

      return true;
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: web3.utils.toHex(e).toString(16),
                rpcUrl: Config.RPC_URL,
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    //console('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    return false;

  }
}

export const getServiceFees = async () => {
  // console.log("web3sweb3",data,Config.RPC_URL);
  var rpcObj = new Web3(Config.RPC_URL)
  var fees = {}
  if (rpcObj) {
    try {
      var marketObj = new rpcObj.eth.Contract(
        marketAbi,
        Config.TradeContract
      );
      var servicefees = await marketObj.methods.getServiceFee().call()
      console.log("servicefees",servicefees);
      fees.buyerFees = servicefees[0]
      fees.sellerFees = servicefees[1]

      return fees;
    }
    catch (e) {
      console.log("service fees catch blok running",e)
    }
  }
}
