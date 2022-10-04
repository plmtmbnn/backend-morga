import { Request, Response } from "express";

import { EXCEPTION_MESSAGE } from "../helper/EXCEPTION_MESSAGE";
import { CustomException } from "../helper/CustomException";

import { newsQuery, newsCommentQuery, newsLikeQuery, newsViewLogQuery, imageQuery } from "../sequelize/query";
import { sequelize } from "../sequelize/init";
import { Op, col, fn, where, literal } from "sequelize";

//helper
import { queryPayload } from "../helper/QueryPayload";
import { FileHelper } from "../helper/FileHelper";
import { generateNewsUrl } from "../helper/StringManipulation";
import moment from "moment";

export class NewsService {
  static async upsertNews(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      let image_url: string = undefined;
      if (req.body.file) {
        const uploadStatus: any = await FileHelper.saveAndResizeFile(
          req.body.file,
          "./image/news/"
        );      
        image_url = uploadStatus.status ? uploadStatus.filename : undefined;
      }

      let checkNews: any = null;
      if (req.body.news_id) {
        checkNews = await newsQuery.findAndCountAll({
          where: { id: req.body.news_id },
          transaction,
        });
      }

      let news_url: string = `${moment().format(
        "YYMMDD-HH-mm-ss"
      )}_${generateNewsUrl(req.body.title || "Tidak Ada Judul")}`;

      if (req.body.news_id && checkNews && checkNews.count > 0) {
        await newsQuery.update(
          {
            news_url,
            title: req.body.title,
            image_url,
            content: req.body.content,
            status: req.body.status,
            category_id: req.body.category_id || undefined,
            posted_at: req.body.posted_at || undefined,
            image_desc: req.body.image_desc || undefined,
            is_recommendation: req.body.is_recommendation,
            is_trending: req.body.is_trending         
          },
          {
            where: { id: req.body.news_id },
            transaction,
          }
        );
      } else {
        await newsQuery.insert(
          {
            news_url,
            title: req.body.title,
            image_url,
            content: req.body.content,
            status: req.body.status,
            category_id: req.body.category_id || undefined,
            posted_at: req.body.posted_at || undefined,
            author_id: req.body.author_id || undefined,
            image_desc: req.body.image_desc || undefined,
            is_recommendation: req.body.is_recommendation,
            is_trending: req.body.is_trending
          },
          {
            transaction,
          }
        );
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("[NewsService][upsertNews]", error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }

  static async getNews(req: Request, res: Response): Promise<any> {
    let queryPayload: queryPayload = {
      where: {
        news_url: req.params.news_url,
      },
      order: [["id", "ASC"]],
    };
    const result: any = await newsQuery.findAndCountAll(queryPayload);

    if (result.count === 0)
      throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    const likes: any = await newsLikeQuery.findAndCountAll({
      where: { news_id: result.rows[0].id },
    });

    const comments: any = await newsCommentQuery.findAndCountAll({
      where: { news_id: result.rows[0].id },
      order: [["created_at", "DESC"]],
    });
    
    await sequelize.transaction(async (transaction: any) => {
        await newsViewLogQuery.insert({
          news_id: result.rows[0].id
        }, {transaction});
    });

    return {
      data: {
        news: result.rows[0],
        likes: likes.count,
        comments: comments.count
      },
    };
  }

  static async getNewsById(req: Request, res: Response): Promise<any> {
    let queryPayload: queryPayload = {
      where: {
        id: req.params.id,
      },
      order: [["id", "ASC"]],
    };
    const result: any = await newsQuery.findAndCountAll(queryPayload);

    if (result.count === 0)
      throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    const likes: any = await newsLikeQuery.findAndCountAll({
      where: { news_id: result.rows[0].id },
    });

    const comments: any = await newsCommentQuery.findAndCountAll({
      where: { news_id: result.rows[0].id },
      order: [["created_at", "DESC"]],
    });
    
    return {
      data: {
        news: result.rows[0],
        likes: likes.count,
        comments: comments.count
      },
    };
  }

  static async getNewsList(req: Request, res: Response): Promise<any> {
    const where: any = {};

    if(req.body.category_id){ where.category_id = req.body.category_id}
    if(req.body.title){ where.title = req.body.title}
    if(req.body.author_id){ where.author_id = req.body.author_id}
    if(req.body.status !== undefined){ where.status = req.body.status}
    if(req.body.is_recommendation !== undefined){ where.is_recommendation = req.body.is_recommendation}
    if(req.body.is_trending !== undefined){ where.is_trending = req.body.is_trending}

    const limit: number = req.body.limit || undefined;
    const offset: number =  req.body.offset || undefined;
    let queryPayload: queryPayload = {
      where,
      order: [["id", "ASC"]],
      limit,
      offset
    };
    const result: any = await newsQuery.getNewsDetailRaw(queryPayload);
    
    if (result?.length === 0)
      throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    const count: number = result && result.length && result.length > 0 ? parseFloat(result[0].total_data) : 0;
    return { data: result, count};
  }

  static async uploadImage(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      let checkNews: any = null;
      if (req.body.news_id) {
        checkNews = await newsQuery.findAndCountAll({
          where: { id: req.body.news_id },
          transaction,
        });        
      }

      if (req.body.news_id && checkNews && checkNews.count === 0) {
        throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);
      }
      
      let image_url: string = undefined;
      if (req.body.file) {
        const uploadStatus: any = await FileHelper.saveAndResizeFile(
          req.body.file,
          "./image/news/"
        );
        image_url = uploadStatus.status ? uploadStatus.filename : undefined;
      }      

        await imageQuery.insert(
          {
            image_url,
            news_id: req.body.news_id
          },
          {
            transaction,
          }
        );
      
      await transaction.commit();
      return {
        image_url
      }
    } catch (error) {
      await transaction.rollback();
      console.log("[NewsService][uploadImage]", error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }
}
