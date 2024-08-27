import { createContext, Dispatch, SetStateAction} from 'react';
import {ClientInterface} from '@/app/admin/components/Interface/ClientInterface'

// Define the shape of the context value
interface ClientContextType {
  client: ClientInterface,
  setClient: Dispatch<SetStateAction<ClientInterface>>;
}

// Create the context with an initial value
const ClientContext = createContext<ClientContextType | undefined>(undefined);

export default ClientContext