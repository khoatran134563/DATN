const countUsersByRole = (users = []) => {
  return users.reduce(
    (acc, user) => {
      if (user.role === 'student') acc.students += 1;
      else if (user.role === 'teacher') acc.teachers += 1;
      else if (user.role === 'admin') acc.admins += 1;

      acc.total += 1;
      return acc;
    },
    {
      total: 0,
      students: 0,
      teachers: 0,
      admins: 0,
    }
  );
};

const countQuestionsByLevel = (questions = []) => {
  return questions.reduce(
    (acc, q) => {
      if (q.quiz_id?.endsWith('nbth')) acc.nbth += 1;
      else if (q.quiz_id?.endsWith('vdvdc')) acc.vdvdc += 1;
      else acc.other += 1;

      acc.total += 1;
      return acc;
    },
    {
      total: 0,
      nbth: 0,
      vdvdc: 0,
      other: 0,
    }
  );
};

const countForumByStatus = (posts = []) => {
  return posts.reduce(
    (acc, post) => {
      if (post.status === 'pending') acc.pending += 1;
      else if (post.status === 'active') acc.active += 1;
      else if (post.status === 'rejected') acc.rejected += 1;
      else if (post.status === 'hidden') acc.hidden += 1;

      acc.total += 1;
      return acc;
    },
    {
      total: 0,
      pending: 0,
      active: 0,
      rejected: 0,
      hidden: 0,
    }
  );
};

module.exports = {
  countUsersByRole,
  countQuestionsByLevel,
  countForumByStatus,
};