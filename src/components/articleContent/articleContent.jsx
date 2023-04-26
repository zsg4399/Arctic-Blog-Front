import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import indexstyle from "./articleContent.module.scss";
import { getArticleById } from "../../api/article";
import { useSearchParams } from "react-router-dom";
import { EyeFilled, StarFilled } from "@ant-design/icons";

const ArticleContent = () => {
  const [article, setArticle] = useState({
    id: "",
    title: "",
    imageUrl: "",
    summary: "",
    articleRaw: "",
    articleHtml: "",
    author: { id: "", username: "", avatar: "" },
    createTime:'',
    articleStars:0,
    articleViews:0,
    articleLikes:0,
    tags:[{id:'',tagName:''}],
    categorys:[{id:'',categoryName:''}]
  });
  const [search] = useSearchParams();
  const articleId = search.get("articleId");
  useEffect(() => {
    getArticleById(articleId)
      .then((res) => {
        console.log(res);
        setArticle(res.data.data);
        document.title(article.title)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [articleId,article.title]);
  return (
    <>
      <div className={indexstyle.articleContainer}>
        <Row className={indexstyle.titleContainer}>{article.title}</Row>
        <Row className={indexstyle.detailContainer}>
          <Col span={3}>作者:{article.author.username}</Col>
          <Col offset={1} span={5}>
            发布于{article.createTime.replace("T", " ")}
          </Col>
          <Col offset={1} span={2}>
            <EyeFilled />
            {article.articleViews}
          </Col>
          <Col offset={1} span={2}>
            <StarFilled />
            {article.articleStars}
          </Col>
        </Row>
        <Row
          className={indexstyle.contentContainer}
          dangerouslySetInnerHTML={{ __html: article.articleHtml }}
        ></Row>
        <Row className={indexstyle.extraContainer}></Row>
      </div>
    </>
  );
};

export default ArticleContent;
