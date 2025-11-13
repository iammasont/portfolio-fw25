import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '2452ec279553665beebaaab76a45abafbd8093ce', queries,  });
export default client;
  