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

    catch(error) {
      next(error);
    }
  })
  .post(requireAuth, parser, async (req, res, next) => {
    try {
      const { content } = req.body;
      const db = req.app.get('db');
      const snippet = {
        user_id: req.user[0].id,
        content
      }
      const newSnippet = await snippetService.postSnippet(db, snippet);
      
      res.send(newSnippet);
    }

    catch(error) {
      next(error);
    }
  
  });

module.exports = snippetRoute;