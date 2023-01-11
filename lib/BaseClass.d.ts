import { BaseClassLike } from "./types";
export = BaseClass;

declare class BaseClass<T extends BaseClass<any> | null = null> {
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
