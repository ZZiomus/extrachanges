import { client } from "./configs";

export const checkSession = async () => {
  const accessToken = localStorage.getItem("hpx-web-token");

  if (!accessToken) return;
  const { data } = await client.get("/api/v1/auth/session", {
    headers: {
      Authorization: accessToken,
    },
  });
  return data;
};

export const createOrGetReferralInfo = async (payload) => {
  const { data } = await client.post("/api/v1/referral/referral-code", payload);
  return data;
};

export const getConnectedWalletinfo = async (payload) => {
  const { data } = await client.get(`/api/v1/auth/wallet-connect/${payload}`);
  return data;
};

export const getWalletReferrals = async (payload) => {
  const accessToken = localStorage.getItem("hpx-web-token");

  const { data } = await client.get(
    `/api/v1/referral/wallet-refferals/${payload}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  return data;
};

export const joinWithReferralCode = async (payload, referralCode) => {
  const { data } = await client.post(
    `/api/v1/referral/join-referral-code/${referralCode}`,
    payload
  );
  return data;
};

export const downloadAllAddressesCSV = async (payload) => {
  const { data } = await client.post(
    "/api/v1/admin/download-addresses",
    payload
  );

  return data;
};
