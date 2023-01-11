import BaseClass from './BaseClass'
import CurveParams from './CurveParams';

/**类似基类的子类的对象 */
type BaseClassLike<T> = T | Omit<Partial<T>, keyof BaseClass>

/**曲线参数 */
type CurveParamsLike = BaseClassLike<CurveParams>;
