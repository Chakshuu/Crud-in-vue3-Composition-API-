/* eslint-disable no-async-promise-executor */
import axios from 'axios';

const url = 'http://localhost:3000/api/users/';

class UserService {
  // Get Post
  static getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const { users } = res.data;
        resolve(
          users.map((user) => ({
            ...user,
            createdAt: new Date(user.createdAt),
          })),
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  // Create Post
  static insertUser(fname, lname, age, gender) {
    return axios.post(url, {
      fname,
      lname,
      age,
      gender,
    });
  }

  // Delete Post
  static deleteUser(id) {
    return axios.delete(`${url}${id}`);
  }

  // Update User
  static updateUser(id, user) {
    return axios.put((`${url}${id}`), {
      fname: user.fname,
      lname: user.lname,
      age: user.age,
      gender: user.gender,
    });
  }

  // Fetch User
  static fetchUser(id) {
    return axios.get(`${url}${id}`);
  }
}

export default UserService;
