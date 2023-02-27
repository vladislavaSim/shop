import {queryGoodUpsert} from "../../graphQL/admin/actionGoodUpsert";
import {queryAllGoods} from "../../graphQL/getGoodsQuery";
import {clearPromiseByName} from "./actionsPromise";

export const actionGoodUpsert = (good) =>
    async (dispatch) => {
        await dispatch(queryGoodUpsert(good))
        await dispatch(queryAllGoods())
        await dispatch(clearPromiseByName('orderUpsert'))
    }

