import ''

/**随机生成一个位于 [min, fmax) 的整数或实数 */
declare function randL(min: number, fmax: number): number

/**随机生成一个位于 [min, max] 的整数 */
declare function randCZ(min: number, max: number): number

/**随机生成一个位于 [min, max] 的实数 */
declare function randCR(min: number, max: number): number
declare namespace randCR {
	/**最浅小数位 用以防止生成整数的情况发生 */
	let minDigit: number
}