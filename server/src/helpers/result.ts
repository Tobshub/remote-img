
interface Ok<V> {
  readonly ok: true,
  readonly value: V
} 

export const Ok = <const V>(value: V): Ok<V> => ({ok: true, value}) as const;

interface Err<M> {
  readonly ok: false,
  readonly message: M,
  readonly cause?: any
}

export const Err = <const M>(message: M, cause?: any): Err<M> => ({ok: false, message, cause}) as const;
