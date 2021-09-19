import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "src/libs/prisma";

type DefaultSession = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string | null | undefined;
};

const options: NextAuthOptions = {
  providers: [
    Providers.LINE({
      clientId: process.env.LINE_CLIENT_ID,
      clientSecret: process.env.LINE_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  callbacks: {
    session: async (session, user) => {
      // user はデータベースに保存されている user オブジェクト
      (session.user as DefaultSession).id = user.id as string;
      return Promise.resolve(session);
    },
  },
};
//
const nextauth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options);
};

export default nextauth;
