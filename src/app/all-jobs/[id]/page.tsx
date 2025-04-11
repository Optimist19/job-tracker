import React from 'react'
import EditComp from '@/components/EditComp'



async function EditPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params 

	//The id is job id and not the user user id
  return (
	<div>
		<EditComp id={id} />
	</div>
  )
}

export default EditPage