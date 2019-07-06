const snippetService = {
  getSnippets(db, id) {
    return db
      .select('*')
      .from('snippets')
      .where('user_id', id)
  },

  postSnippet(db, snippet) {
    return db
      .into('snippets')
      .insert(snippet)
      .returning('*')
      .then(row => row[0])
  }
};

module.exports = snippetService;