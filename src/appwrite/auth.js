import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const UserAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (UserAccount) {
        return this.LogginUser(email, password);
      } else {
        return UserAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async LogginUser({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
      
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(){
    try {
        return this.account.get()
    } catch (error) {
        throw error;
    }
    return null;
  }

  async Logout(){
    try {
        return this.account.deleteSessions()
    } catch (error) {
        throw error;
    }
  }
}

const authservice = new Authservice();

export default authservice;
