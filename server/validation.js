// server/validation.js
const { z } = require('zod');


const registerSchema = z.object({
username: z.string().min(3).max(30),
email: z.string().email(),
password: z.string().min(6).max(100),
});


const loginSchema = z.object({
email: z.string().email(),
password: z.string().min(6).max(100),
});


const productCreateSchema = z.object({
title: z.string().min(2).max(120),
description: z.string().max(1000).optional().default(''),
category: z.string().min(2).max(40),
price: z.coerce.number().int().nonnegative(),
});


const profileUpdateSchema = z.object({
username: z.string().min(3).max(30),
address: z.string().max(200).optional().default(''),
});


module.exports = {
registerSchema,
loginSchema,
productCreateSchema,
profileUpdateSchema,
};