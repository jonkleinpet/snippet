const snippetService = {
  getSnippets(db, id) {
    return db
      .select('*')
      .from('snippets')
      .where('user_id', id)
      .orderBy('date_created');
  },

  postSnippet(db, snippet) {
    return db
      .into('snippets')
      .insert(snippet)
      .returning('*')
      .then(row => row[0]);
  },

  editSnippet(db, id, content, user_id) {
    return db('snippets')
      .where({ id })
      .update({ content }, ['*'])
      .then(async () => {
        const snippets = await this.getSnippets(db, user_id);
        return snippets;
      });

  }
};

module.exports = snippetService;