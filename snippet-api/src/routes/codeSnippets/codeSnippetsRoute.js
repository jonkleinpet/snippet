const express = require('express');
const snippetService = require('./codeSnippetsService');
const parser = express.json();
const snippetRoute = express.Router();
const {requireAuth} = require('../../services/jwt-service');

snippetRoute
  .route('/')
  .get(requireAuth, async (req, res, next) => {
    const db = req.app.get('db');
    const id = req.user[0].id;
    try {
      const userSnippets = await snippetService.getSnippets(db, id);
      return res.send(userSnippets);
    }

    catch (error) {
      next(error);
    }
  })
  .post(requireAuth, parser, async (req, res, next) => {
    try {
      for (let i of ['content', 'title']) {
        if (!req.body[i]) {
          return res.send({ error: `${i} required` });
        }
      }

      const { content, title } = req.body;
      const db = req.app.get('db');
      const snippet = {
        user_id: req.user[0].id,
        title,
        content
      };
      const newSnippet = await snippetService.postSnippet(db, snippet);
      res.send(newSnippet);
    }

    catch (error) {
      next(error);
    }
  
  })
  .patch(requireAuth, parser, async (req, res, next) => {
    try {
      const db = req.app.get('db');
      const { content, id } = req.body;
      const user_id = req.user[0].id;
      const snippets = await snippetService.editSnippet(db, id, content, user_id);
      return res.send(snippets);
    }

    catch (error) {
      next(error);
    }
  })
  .delete(requireAuth, parser, async (req, res, next) => {
    try {
      const db = req.app.get('db');
      const { id } = req.body;
      const user_id = req.user[0].id; 
      const snippets = await snippetService.deleteSnippet(db, id, user_id);
      res.send(snippets);
    }

    catch (error) {
      next(error);
    }
  });

module.exports = snippetRoute;