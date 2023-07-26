import Amplify from 'aws-amplify';
import { EncryptStorage } from 'encrypt-storage';

const encryptStorage = EncryptStorage('secret_key',{

  stateManagementUse: true,
});



Amplify.configure({
  Auth: {
  
    storage: encryptStorage,
  },
});
export default encryptStorage;