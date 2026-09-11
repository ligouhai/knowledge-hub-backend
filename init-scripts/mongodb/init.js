/*
 * @Date: 2026-09-01 10:39:43
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-01 11:16:47
 */
db = db.getSiblingDB('knowledge_hub');

db.createUser({
  user: 'knowledge_hub_user',
  pwd: 'knowledge_hub_password',
  roles: [{ role: 'readWrite', db: 'knowledge_hub' }],
});

db.createCollection('document_content');
