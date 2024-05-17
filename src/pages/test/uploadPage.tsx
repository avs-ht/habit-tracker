import { UploadDataForm } from '@/components/test/upload-data/uploadDataForm'
import { Text } from '@/components/ui/text/text'

import { useUserInfo } from '@/hooks/user/useUserInfo'

export const UploadPage = () => {
	const { id } = useUserInfo()
	return (
		<>
			<Text>Здесь вы можете загрузить привычки для определенного юзера</Text>
			<Text marginBottomCoef={0.3}>
				ID текущего юзера (выбранный профиль): <b>{id}</b>
			</Text>
			<UploadDataForm />
		</>
	)
}
