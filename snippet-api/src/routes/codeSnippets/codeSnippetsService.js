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
      .then(async () => {
        const snippets = await this.getSnippets(db, snippet.user_id);
        return snippets;
      });
  },

  editSnippet(db, id, content, user_id) {
    return db('snippets')
      .where({ id })
      .update({ content }, ['*'])
      .then(async () => {
        const snippets = await this.getSnippets(db, user_id);
        return snippets;
      });
  },

  deleteSnippet(db, id, user_id) {
    console.log({id});
    
    return db('snippets')
      .where({ id })
      .del()
      .then(async () => {
        const snippets = await this.getSnippets(db, user_id);
        return snippets;
      });
  }
};

module.exports = snippetService;