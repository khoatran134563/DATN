import { test, expect } from '@playwright/test';
import { loginByApi } from './helpers/auth';

test.describe('System Testing - Forum Flow', () => {
  test.beforeEach(async ({ page, request }) => {
    await loginByApi(page, request, 'teacher');
  });

  test('Giáo viên mở trang forum và thấy chức năng đăng bài mới', async ({ page }) => {
    await page.goto('/forum');

    await expect(page.locator('body')).toContainText(/Diễn đàn thảo luận|Forum/i);
    await expect(page.locator('body')).toContainText(/Đăng bài mới/i);
  });

  test('Giáo viên mở trang tạo bài viết forum', async ({ page }) => {
    await page.goto('/forum/create');

    await expect(page.locator('body')).toContainText(/Chọn chuyên mục bài viết|Tiêu đề bài viết|Nội dung chi tiết|Nội dung/i);
  });
});