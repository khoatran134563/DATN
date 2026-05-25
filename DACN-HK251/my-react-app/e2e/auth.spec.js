import { test, expect } from '@playwright/test';
import { loginByApi } from './helpers/auth';

test.describe('System Testing - Authentication Flow', () => {
  test('Đăng nhập giáo viên thành công và chuyển vào hệ thống', async ({ page, request }) => {
    await loginByApi(page, request, 'teacher');

    await page.goto('/progress');

    await expect(page.locator('body')).toContainText(/ChemLearn|Tiến độ học tập|Trung tâm giảng dạy|Kiến thức/i);
  });
});