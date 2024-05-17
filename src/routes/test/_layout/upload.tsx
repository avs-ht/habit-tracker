import { createFileRoute } from '@tanstack/react-router'

import { UploadPage } from '@/pages/test/uploadPage'

export const Route = createFileRoute('/test/_layout/upload')({
	component: UploadPage,
})
