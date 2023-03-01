import {queryGoodUpsert} from "../../graphQL/admin/actionGoodUpsert";
import {queryAllGoods} from "../../graphQL/getGoodsQuery";
import {clearPromiseByName} from "./actionsPromise";
import {getCatsQuery} from "../../graphQL/getCats";

export const actionGoodUpsert = (good) =>
    async (dispatch) => {
        await dispatch(queryGoodUpsert(good))
        await dispatch(getCatsQuery())
        await dispatch(queryAllGoods())
        await dispatch(clearPromiseByName('orderUpsert'))
    }

