import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ParentLayout from '../components/parent/ParentLayout'
import storeGenerator from "../redux/setup/store"
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={storeGenerator().store}>
      <PersistGate loading={null} persisot={storeGenerator().persistor}>
        <ParentLayout>
      <Component {...pageProps} />
      </ParentLayout>
      </PersistGate>
    </Provider>
  )
}
export default MyApp
