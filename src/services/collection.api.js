import { axiosFunc } from "../shared/common";
import { Decryptdata, Encryptdata } from "../shared/screatkeeper";
import config from '../config'
export const CollectionByCreator = async (data) => {
    // let datas = Encryptdata(data);
    console.log("CollectionByCreator" , data)
    var senddata = {
        method: 'get',
        url: `${config.BACK_URL}/nft/CollectionByCreator`,
        // params: { data: datas } ?? {}
        params:  data
    }
    let Resp = await axiosFunc(senddata)
    console.log("aRespRexxspResp", Resp);
    // Resp.data = Decryptdata(Resp.data)
    console.log("Resp.dataResp.data", Resp?.data);

    return Resp.data
}