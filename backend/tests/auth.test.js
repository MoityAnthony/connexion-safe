const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/api', authRoutes);

describe('Auth Routes', () => {
    test('Login with correct credentials', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
    });

    test('Login with incorrect credentials', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(401);
    });

    test('Verify 2FA with correct code', async () => {
        const res = await request(app)
            .post('/api/verify-2fa')
            .send({
                email: 'test@example.com',
                code: '123456'  // Remplacez par un code valide
            });
        expect(res.statusCode).toEqual(200);
    });

    test('Verify 2FA with incorrect code', async () => {
        const res = await request(app)
            .post('/api/verify-2fa')
            .send({
                email: 'test@example.com',
                code: '000000'
            });
        expect(res.statusCode).toEqual(401);
    });
});