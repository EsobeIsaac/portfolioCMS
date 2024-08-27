import { createContext, Dispatch, SetStateAction} from 'react';
import {AlertInterface} from '@/app/admin/components/Interface/AlertInterface'

// Define the shape of the context value
interface AlertContextType {
  alert: AlertInterface,
  setAlert: Dispatch<SetStateAction<AlertInterface>>;
}

// Create the context with an initial value
const AlertContext = createContext<AlertContextType | undefined>(undefined);

export default AlertContext