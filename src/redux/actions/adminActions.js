import {queryGoodUpsert} from "../../graphQL/admin/actionGood";
import {queryAllGoods} from "../../graphQL/getGoodsQuery";
import {clearPromiseByName} from "./actionsPromise";
import {getCatsQuery} from "../../graphQL/getCats";

export const actionGoodUpsert = (good) =>
    async (dispatch) => {
        console.log(good)
        await dispatch(queryGoodUpsert(good))
        await dispatch(getCatsQuery())
        await dispatch(clearPromiseByName('uploadFile'))
        await dispatch(queryAllGoods())
        await dispatch(clearPromiseByName('goodUpsert'))
    }

