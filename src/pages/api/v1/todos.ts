import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "src/libs/prisma";

type Data = {
  id: number;
  title: string;
  content: string;
  type: string;
};

type DefaultSession = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: number | null | undefined;
};

const todos = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).end("Please SignIn to view");
  const userId = (session.user as DefaultSession).id as number;

  if (req.method === "GET") {
    const todos = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId,
      },
    });

    return res.status(200).json(todos);
  }

  if (req.method === "POST") {
    const { title, content, type } = JSON.parse(req.body) as Data;

    const createdTodo = await prisma.task.create({
      data: {
        title,
        content,
        type,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(201).json(createdTodo);
  }

  if (req.method === "PUT") {
    const { id, title, content, type } = JSON.parse(req.body) as Data;

    const updatedTodo = await prisma.task.update({
      where: { id },
      data: {
        title,
        content,
        type,
      },
    });

    res.status(200).json(updatedTodo);
  }

  if (req.method === "DELETE") {
    const id = JSON.parse(req.body) as number;

    const deleteTodo = await prisma.task.delete({
      where: { id },
    });

    res.status(200).json(deleteTodo);
  }
};

export default todos;
