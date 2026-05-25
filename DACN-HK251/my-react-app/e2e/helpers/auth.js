import { expect } from '@playwright/test';

const API_BASE = process.env.E2E_API_BASE || 'http://localhost:5000';

export const TEST_ACCOUNTS = {
  teacher: {
    email: process.env.E2E_TEACHER_EMAIL || 'khoa.tran134563@gmail.com',
    password: process.env.E2E_TEACHER_PASSWORD || '12345678Aa',
  },
  admin: {
    email: process.env.E2E_ADMIN_EMAIL || 'admin@chemlearn.com',
    password: process.env.E2E_ADMIN_PASSWORD || 'Admin@123456',
  },
};

export async function loginByApi(page, request, role = 'teacher') {
  const account = TEST_ACCOUNTS[role];

  const response = await request.post(`${API_BASE}/api/auth/login`, {
    data: {
      email: account.email,
      password: account.password,
    },
  });

  expect(response.ok(), `Đăng nhập API thất bại cho role ${role}`).toBeTruthy();

  const data = await response.json();

  await page.goto('/');

  await page.evaluate(
    ({ token, user }) => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
    },
    {
      token: data.token,
      user: data.user,
    }
  );
}