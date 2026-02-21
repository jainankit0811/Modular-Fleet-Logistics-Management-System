import bcrypt from 'bcryptjs';
import prisma from './src/config/prisma.js';

async function seed() {
    const hashed = await bcrypt.hash('password123', 10);
    try {
        await prisma.user.upsert({
            where: { email: 'admin@fleet.com' },
            update: {},
            create: {
                name: 'Admin',
                email: 'admin@fleet.com',
                password: hashed,
                role: 'Manager'
            }
        });
        console.log('Seed complete: admin@fleet.com / password123');
    } catch (error) {
        console.error('Seed failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
