import ChangeRF from './main';
const a = new ChangeRF.CurveParams();
a.config('maxn', 123)
let b: ChangeRF.CurveParamsLike;
const d = ChangeRF.change_rf(123, {});
ChangeRF