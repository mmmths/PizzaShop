import { api } from '@/lib/axios'

export interface DispatchDetailsParams {
  orderId: string
}

export async function dispatchOrder({ orderId }: DispatchDetailsParams) {
  await api.patch(`/orders/${orderId}/dispatch`)
}
