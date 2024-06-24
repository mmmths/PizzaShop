import { api } from '@/lib/axios'

export interface ApproveOrderDetailsParams {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderDetailsParams) {
  await api.patch(`/orders/${orderId}/approve`)
}
