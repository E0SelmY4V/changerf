export namespace ChangeRF {

	/**基类 */
	class BaseClass<T extends BaseClass<any> | null = null> {
		constructor(n?: T extends BaseClass<null> ? T : BaseClassLike<T>)
		/**批量修改对象属性 */
		static attr<N>(obj: N, n?: BaseClassLike<N>): void
		/**修改单个对象属性 */
		static attr<N, K extends keyof BaseClassLike<N>>(obj: N, key: K, value: N[K]): void
		/**批量修改属性 */
		attr(n?: BaseClassLike<T>): void
		/**修改单个属性 */
		attr<K extends keyof BaseClassLike<T>>(key: K, value: T[K]): void
		/**批量修改原型属性 */
		attrProto(n?: BaseClassLike<T>): void
		/**修改单个原型属性 */
		attrProto<K extends keyof BaseClassLike<T>>(key: K, value: T[K]): void
		/**基类的子类原型 */
		proto: T
		/**属性处理函数 */
		parser: { [K in keyof BaseClassLike<T>]?: (n: any) => T[K] }
	}

	/**类似基类的子类的对象 */
	type BaseClassLike<T> = T | Omit<Partial<T>, keyof BaseClass>;

	/**曲线参数类 */
	class CurveParams extends BaseClass<CurveParams> {
		/**批量修改原型属性 */
		static attr(n?: CurveParamsLike): void
		/**修改单个原型属性 */
		static attr<K extends keyof CurveParamsLike>(key: K, value: CurveParams[K]): void
		/**处理曲线参数 */
		static parse(n?: CurveParamsLike): CurveParams
		/**曲线种类。0~3分别对应随机、多次函数、椭圆函数、三角函数 */
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

	/**曲线参数 */
	type CurveParamsLike = BaseClassLike<CurveParams>;

	/**随机生成一个位于 [min, fmax) 的整数或实数 */
	function randL(min: number, fmax: number): number

	/**随机生成一个位于 [min, max] 的整数 */
	function randCZ(min: number, max: number): number

	/**随机生成一个位于 [min, max] 的实数 */
	function randCR(min: number, max: number): number
	namespace randCR {
		/**最浅小数位 用以防止生成整数的情况发生 */
		let minDigit: number
	}

	/**生成一个平滑的函数 */
	function crf(
		/**移动的距离 */
		l: number,
		/**生成参数 */
		params: CurveParamsLike,
	): number[]

	/**更简单，更优雅地生成一个平滑的函数 */
	function ctf(
		/**函数起始的值 */
		from: number,
		/**函数结束的位置 */
		to: number,
		/**生成参数 */
		params: CurveParams,
	): number[]

}
export default ChangeRF