const CHAPTER_QUIZ_MAP = {
  chapter1: {
    nbth: ['cbhh_nbth', 'tddn_nbth'],
    vdvdc: ['cbhh_vdvdc', 'tddn_vdvdc'],
  },
  chapter2: {
    nbth: [
      'nitrogen_nbth',
      'ammonia_nbth',
      'ammonium_nbth',
      'nitric_acid_nbth',
      'nitrate_nbth',
    ],
    vdvdc: [
      'nitrogen_vdvdc',
      'ammonia_vdvdc',
      'ammonium_vdvdc',
      'nitric_acid_vdvdc',
      'nitrate_vdvdc',
    ],
  },
};

const getQuizIdsByChapterAndLevel = (chapterId, levelId) => {
  const chapter = CHAPTER_QUIZ_MAP[chapterId];

  if (!chapter) return [];

  if (levelId === 'mixed') {
    return [...chapter.nbth, ...chapter.vdvdc];
  }

  return chapter[levelId] || [];
};

const filterQuestionsByChapterAndLevel = (questions, chapterId, levelId) => {
  const allowedQuizIds = getQuizIdsByChapterAndLevel(chapterId, levelId);

  return questions.filter((question) =>
    allowedQuizIds.includes(question.quiz_id)
  );
};

describe('Unit Test - Quiz Filter Logic', () => {
  const mockQuestions = [
    { _id: '1', quiz_id: 'cbhh_nbth', question_text: 'Câu 1' },
    { _id: '2', quiz_id: 'tddn_nbth', question_text: 'Câu 2' },
    { _id: '3', quiz_id: 'cbhh_vdvdc', question_text: 'Câu 3' },
    { _id: '4', quiz_id: 'tddn_vdvdc', question_text: 'Câu 4' },
    { _id: '5', quiz_id: 'nitrogen_nbth', question_text: 'Câu 5' },
  ];

  test('Chọn chương 1 + NB-TH thì lấy cbhh_nbth và tddn_nbth', () => {
    const result = filterQuestionsByChapterAndLevel(
      mockQuestions,
      'chapter1',
      'nbth'
    );

    expect(result).toHaveLength(2);
    expect(result.map((item) => item.quiz_id)).toEqual([
      'cbhh_nbth',
      'tddn_nbth',
    ]);
  });

  test('Chọn chương 1 + VD-VDC thì lấy cbhh_vdvdc và tddn_vdvdc', () => {
    const result = filterQuestionsByChapterAndLevel(
      mockQuestions,
      'chapter1',
      'vdvdc'
    );

    expect(result).toHaveLength(2);
    expect(result.map((item) => item.quiz_id)).toEqual([
      'cbhh_vdvdc',
      'tddn_vdvdc',
    ]);
  });

  test('Chọn chương 1 + mixed thì lấy đủ 4 quiz_id của chương 1', () => {
    const result = filterQuestionsByChapterAndLevel(
      mockQuestions,
      'chapter1',
      'mixed'
    );

    expect(result).toHaveLength(4);
    expect(result.map((item) => item.quiz_id)).toEqual([
      'cbhh_nbth',
      'tddn_nbth',
      'cbhh_vdvdc',
      'tddn_vdvdc',
    ]);
  });

  test('Chọn chương không tồn tại thì trả về danh sách rỗng', () => {
    const result = filterQuestionsByChapterAndLevel(
      mockQuestions,
      'chapter999',
      'mixed'
    );

    expect(result).toEqual([]);
  });
});