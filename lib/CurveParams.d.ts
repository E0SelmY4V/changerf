import BaseClass = require('./BaseClass')
import { CurveParamsLike } from "./types"
export = CurveParams

/**曲线参数类 */
declare class CurveParams extends BaseClass<CurveParams> {
	/**批量修改原型属性 */
	static attr(n?: CurveParamsLike): void
	/**修改单个原型属性 */
	static attr<K extends keyof CurveParamsLike>(key: K, value: CurveParams[K]): void
	/**处理曲线参数 */
	static parse(n?: CurveParamsLike): CurveParams
	/**曲线种类。从 0~3 分别对应随机、多次函数、椭圆函数、三角函数 */
	type: 0 | 1 | 2 | 3
	/**曲线最大/最小斜率 */
	slope: number
	/**曲线减速倍数 */
	multi: number
	/**曲线最大变形程度 */
	minn: number
	/**曲线最小变形程度 */
	maxn: number
	/**是否对结果四舍五入 */
	round: boolean
	/**是否为了使数组长度相近而拉伸图形 */
	tctrl: boolean
}
