import { api } from '@/lib/axios'

export interface DeliverDetailsParams {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverDetailsParams) {
  await api.patch(`/orders/${orderId}/deliver`)
}
