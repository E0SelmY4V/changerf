import { CurveParamsLike } from './types'

/**生成一个平滑的函数 */
declare function crf(
	/**移动的距离 */
	l: number,
	/**生成参数 */
	params: CurveParamsLike,
): number[]

/**更简单，更优雅地生成一个平滑的函数 */
declare function ctf(
	/**函数起始的值 */
	from: number,
	/**函数结束的位置 */
	to: number,
	/**生成参数 */
	params: CurveParamsLike,
): number[]
