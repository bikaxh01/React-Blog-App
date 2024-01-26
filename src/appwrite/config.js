import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID);

    this.database = Databases(this.client);
    this.bucket = Storage(this.client);
  }

  async CreatePost({ tittle, slug, content, feauredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug,
        {
          tittle,
          content,
          feauredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async UpdatePost(slug, { tittle, content, feauredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug,
        {
          tittle,
          content,
          feauredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async DeletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async GetPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async AllPost(queries=[Query.equal("status","active")]) {
    try {
      return await this.database.listDocuments(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        queries,
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  //File Upload Services

  async fileUpload(file){
    try {
      return await this.bucket.createFile(conf.appWriteBucketID,ID.unique(),file)
    } catch (error) {
      throw error;
      return false;
    }
  }

  async deleteFile(fileID){
    try {
       this.bucket.deleteFile(conf.appWriteBucketID,fileID)
       return true;
      
    } catch (error) {
      throw error;
    }
  }

  filePreview(fileID){
  return this.bucket.getFilePreview(conf.appWriteBucketID,fileID)
  }
}

const service = new Services();

export default service;
