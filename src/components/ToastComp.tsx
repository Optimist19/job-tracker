import React from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

function ToastComp() {
  return (
	<div><ToastContainer
	position="bottom-right"
	autoClose={5000}
	hideProgressBar={false}
	newestOnTop={false}
	closeOnClick={false}
	rtl={false}
	pauseOnFocusLoss
	draggable
	pauseOnHover
	theme="dark"
	transition={Bounce}
	/>
	</div>
  )
}

export default ToastComp