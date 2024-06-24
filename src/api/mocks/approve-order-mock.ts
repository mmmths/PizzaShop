import { http, HttpResponse } from 'msw'

import { ApproveOrderDetailsParams } from '../approve-order'

export const approveOrderMock = http.patch<
  ApproveOrderDetailsParams,
  never,
  never
>('/orders/:orderID/approve', async ({ params }) => {
  if (params.orderId === 'error-order-id') {
    return new HttpResponse(null, { status: 400 })
  }
  return new HttpResponse(null, { status: 204 })
})
