\c nc_news_test


select * from articles where article_id = 1;
select comments.article_id from comments;

SELECT  *  FROM articles JOIN comments ON articles.article_id = comments.article_id;
