import { test, expect } from '@playwright/test';
import { loginByApi } from './helpers/auth';

test.describe('System Testing - Admin Flow', () => {
  test.beforeEach(async ({ page, request }) => {
    await loginByApi(page, request, 'admin');
  });

  test('Admin mở trang tổng quan hệ thống', async ({ page }) => {
    await page.goto('/admin/dashboard');

    await expect(page.locator('body')).toContainText(/Tổng quan hệ thống|Tổng thành viên|Câu hỏi trong kho/i);
  });

  test('Admin mở trang ngân hàng câu hỏi', async ({ page }) => {
    await page.goto('/admin/question-bank');

    await expect(page.locator('body')).toContainText(/Ngân hàng câu hỏi|Hiển thị/i);
  });

  test('Admin mở trang quản lý forum', async ({ page }) => {
    await page.goto('/admin/forum-approval');

    await expect(page.locator('body')).toContainText(/Forum|Chờ duyệt|Đã duyệt|Từ chối|Đã ẩn/i);
  });

  test('Admin mở trang quản lý người dùng', async ({ page }) => {
    await page.goto('/admin/users');

    await expect(page.locator('body')).toContainText(/Quản lý người dùng|Họ và tên|Vai trò|Trạng thái/i);
  });
});