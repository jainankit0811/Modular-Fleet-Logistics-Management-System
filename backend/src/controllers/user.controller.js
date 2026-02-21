// User controller
import prisma from '../config/prisma.js';
import asyncHandler from '../utils/asyncHandler.js';

// Get all users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Create a new user
export const createUser = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  const user = await prisma.user.create({
    data: { email, name },
  });
  res.status(201).json(user);
});