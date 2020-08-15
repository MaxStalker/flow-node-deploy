import "./utils/config";
import { createAccount } from "./utils/create-account";
import {
  sendSimpleTransaction,
  sendTransaction,
} from "./utils/send-transaction";
import { deployContract } from "./utils/deploy-code";

const contractHello = `
    pub contract HelloWorld {
      pub let greeting: String
  
      init() {
          self.greeting = "Hello, Cadence!"
      }
  
      pub fun hello(): String {
          return self.greeting
      }
    }
  `;

const main = async () => {
  const account = await createAccount();
  console.log({ account });
  const deployTx = await deployContract(account, contractHello);
  console.log({ deployTx });
  // const tx = await sendSimpleTransaction(account);
  // console.log({ tx });
};

const sendTx = async () => {
  const address = "0x179b6b1cb6755e31";
  const pingTx = `
    import HelloWorld from ${address}
    transaction() {
      prepare(acct: AuthAccount) {
          log(HelloWorld.hello());
        }
      }
  `;
  const tx = await sendTransaction(address, pingTx);
  console.log({ tx });
};

sendTx();

// main();
