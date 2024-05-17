import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IRequestsStore, IUserRequest } from '@/types/store.types'

const DEFAULT_REQUESTS: IUserRequest[] = []
export const useRequestsStore = create<IRequestsStore>()(
	persist(
		set => ({
			requests: DEFAULT_REQUESTS,
			addRequest: request =>
				set(state => ({ requests: [...state.requests, request] })),
			deleteRequest: requestId => {
				set(state => ({
					requests: state.requests.filter(request => request.id !== requestId),
				}))
			},
		}),
		{
			name: 'requests',
			storage: createJSONStorage(() => localStorage),
		},
	),
)
