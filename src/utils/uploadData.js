import createClient from "ipfs-http-client";

const client = createClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const addToIpfs = async (data) => {
  const { path } = await client.add(data);
  console.log(path.toString());
  return path.toString();
};
