const calculateProgress = (completedCount, totalCount) => {
  if (!totalCount || totalCount <= 0) {
    return {
      percent: 0,
      completed: 0,
      remaining: 0,
    };
  }

  const safeCompleted = Math.min(Math.max(completedCount, 0), totalCount);

  return {
    percent: Math.round((safeCompleted / totalCount) * 100),
    completed: safeCompleted,
    remaining: totalCount - safeCompleted,
  };
};

describe('Unit Test - Progress Calculation Logic', () => {
  test('Hoàn thành 2/23 nội dung thì tiến độ bằng 9%', () => {
    const result = calculateProgress(2, 23);

    expect(result).toEqual({
      percent: 9,
      completed: 2,
      remaining: 21,
    });
  });

  test('Chưa hoàn thành nội dung nào thì tiến độ bằng 0%', () => {
    const result = calculateProgress(0, 12);

    expect(result).toEqual({
      percent: 0,
      completed: 0,
      remaining: 12,
    });
  });

  test('Hoàn thành toàn bộ nội dung thì tiến độ bằng 100%', () => {
    const result = calculateProgress(12, 12);

    expect(result).toEqual({
      percent: 100,
      completed: 12,
      remaining: 0,
    });
  });

  test('Nếu completed lớn hơn total thì tự giới hạn về total', () => {
    const result = calculateProgress(30, 23);

    expect(result).toEqual({
      percent: 100,
      completed: 23,
      remaining: 0,
    });
  });

  test('Nếu completed nhỏ hơn 0 thì tự đưa về 0', () => {
    const result = calculateProgress(-5, 12);

    expect(result).toEqual({
      percent: 0,
      completed: 0,
      remaining: 12,
    });
  });

  test('Nếu total không hợp lệ thì trả về tiến độ 0%', () => {
    const result = calculateProgress(5, 0);

    expect(result).toEqual({
      percent: 0,
      completed: 0,
      remaining: 0,
    });
  });
});