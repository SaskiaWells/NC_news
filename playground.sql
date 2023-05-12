\c nc_news_test


-- select * from articles  order by created_at desc;
select * from comments;

SELECT  *  FROM articles JOIN comments ON articles.article_id = comments.article_id;
